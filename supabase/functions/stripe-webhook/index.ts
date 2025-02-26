
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.12.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''

serve(async (req) => {
  try {
    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      console.error('Webhook Fout: Geen handtekening gevonden')
      throw new Error('Geen handtekening gevonden')
    }

    const body = await req.text()
    const event = stripe.webhooks.constructEvent(body, signature, endpointSecret)

    console.log(`Webhook event ontvangen: ${event.type}`)

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const { userId, tierId } = session.metadata || {}

        if (!userId || !tierId) {
          console.error('Webhook Fout: Ontbrekende metadata', { userId, tierId })
          throw new Error('Ontbrekende metadata')
        }

        // Abonnement details ophalen
        const { data: tier, error: tierError } = await supabaseClient
          .from('subscription_tiers')
          .select('*')
          .eq('id', tierId)
          .single()

        if (tierError || !tier) {
          console.error('Webhook Fout: Ongeldig abonnementsniveau', tierError)
          throw new Error('Ongeldig abonnementsniveau')
        }

        // Maak of update abonnement
        await supabaseClient
          .from('subscriptions')
          .upsert({
            profile_id: userId,
            tier_id: tierId,
            stripe_subscription_id: session.subscription as string,
            level: tier.name === 'pro' ? 'enhanced' : 'basic',
            current_period_start: new Date(session.created * 1000).toISOString(),
            current_period_end: new Date().toISOString(), // Wordt bijgewerkt door subscription event
            messages_limit: tier.name === 'pro' ? 1000 : 200,
          })

        console.log(`✅ Abonnement aangemaakt voor gebruiker ${userId}`)
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Zoek de gebruiker op basis van Stripe customer ID
        const { data: profiles, error: profileError } = await supabaseClient
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .limit(1)

        if (profileError || !profiles.length) {
          console.error('Webhook Fout: Gebruiker niet gevonden', { customerId, profileError })
          throw new Error('Gebruiker niet gevonden')
        }

        const userId = profiles[0].id

        await supabaseClient
          .from('subscriptions')
          .update({
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq('profile_id', userId)

        console.log(`✅ Abonnementsperiode bijgewerkt voor gebruiker ${userId}`)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Zoek de gebruiker op basis van Stripe customer ID
        const { data: profiles, error: profileError } = await supabaseClient
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .limit(1)

        if (profileError || !profiles.length) {
          console.error('Webhook Fout: Gebruiker niet gevonden bij annulering', { customerId, profileError })
          throw new Error('Gebruiker niet gevonden bij annulering')
        }

        const userId = profiles[0].id

        // Reset naar gratis abonnement
        await supabaseClient
          .from('subscriptions')
          .update({
            tier_id: null,
            stripe_subscription_id: null,
            level: 'basic',
            messages_limit: 200,
          })
          .eq('profile_id', userId)

        console.log(`✅ Abonnement geannuleerd voor gebruiker ${userId}`)
        break
      }
    }

    return new Response(JSON.stringify({ ontvangen: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('❌ Webhook fout:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
})
