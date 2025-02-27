
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
      throw new Error('No signature')
    }

    const body = await req.text()
    const event = stripe.webhooks.constructEvent(body, signature, endpointSecret)

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const { userId, tierId } = session.metadata || {}

        if (!userId || !tierId) {
          throw new Error('Missing metadata')
        }

        // Get subscription tier details
        const { data: tier } = await supabaseClient
          .from('subscription_tiers')
          .select('*')
          .eq('id', tierId)
          .single()

        if (!tier) {
          throw new Error('Invalid tier')
        }

        // Create or update subscription
        await supabaseClient
          .from('subscriptions')
          .upsert({
            profile_id: userId,
            tier_id: tierId,
            stripe_subscription_id: session.subscription as string,
            level: tier.name === 'pro' ? 'enhanced' : 'basic',
            current_period_start: new Date(session.created * 1000).toISOString(),
            current_period_end: new Date().toISOString(), // Will be updated by subscription event
            messages_limit: tier.name === 'pro' ? 1000 : 200,
          })

        console.log(`✅ Created subscription for user ${userId}`)
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription
        const { supabaseUserId } = subscription.customer as { supabaseUserId: string }

        if (!supabaseUserId) {
          throw new Error('No Supabase user ID in customer metadata')
        }

        await supabaseClient
          .from('subscriptions')
          .update({
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq('profile_id', supabaseUserId)

        console.log(`✅ Updated subscription periods for user ${supabaseUserId}`)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const { supabaseUserId } = subscription.customer as { supabaseUserId: string }

        if (!supabaseUserId) {
          throw new Error('No Supabase user ID in customer metadata')
        }

        // Reset to free tier
        await supabaseClient
          .from('subscriptions')
          .update({
            tier_id: null,
            stripe_subscription_id: null,
            level: 'basic',
            messages_limit: 200,
          })
          .eq('profile_id', supabaseUserId)

        console.log(`✅ Subscription cancelled for user ${supabaseUserId}`)
        break
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('❌ Webhook error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
})
