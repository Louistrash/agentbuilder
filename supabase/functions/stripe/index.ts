
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import { Stripe } from 'https://esm.sh/stripe@14.12.0'
import { corsHeaders } from '../_shared/cors.ts'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2023-10-16',
})

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { action, userId, priceId } = await req.json()

    switch (action) {
      case 'create-subscription': {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        if (!profile) {
          throw new Error('Profile not found')
        }

        // Create a Stripe customer
        const customer = await stripe.customers.create({
          metadata: {
            supabaseUserId: userId,
          },
        })

        // Create the subscription
        const subscription = await stripe.subscriptions.create({
          customer: customer.id,
          items: [{ price: priceId }],
          payment_behavior: 'default_incomplete',
          payment_settings: { save_default_payment_method: 'on_subscription' },
          expand: ['latest_invoice.payment_intent'],
        })

        // Save subscription info to database
        await supabase.from('subscriptions').insert({
          profile_id: userId,
          stripe_subscription_id: subscription.id,
          level: priceId.includes('enhanced') ? 'enhanced' : 'basic',
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        })

        return new Response(
          JSON.stringify({
            subscriptionId: subscription.id,
            clientSecret: (subscription.latest_invoice as any).payment_intent.client_secret,
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      }

      case 'portal': {
        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('stripe_subscription_id')
          .eq('profile_id', userId)
          .single()

        if (!subscription?.stripe_subscription_id) {
          throw new Error('No subscription found')
        }

        const stripeSubscription = await stripe.subscriptions.retrieve(subscription.stripe_subscription_id)
        const session = await stripe.billingPortal.sessions.create({
          customer: stripeSubscription.customer as string,
          return_url: `${req.headers.get('origin')}/account`,
        })

        return new Response(
          JSON.stringify({ url: session.url }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      }

      default:
        throw new Error('Invalid action')
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
