
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12.7.0'

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

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const { user_id, features } = session.metadata || {}
      
      if (!user_id || !features) {
        throw new Error('Missing metadata')
      }

      const featureIds = JSON.parse(features) as string[]

      // Update transaction status
      await supabaseClient
        .from('marketplace_transactions')
        .update({ status: 'completed' })
        .eq('stripe_session_id', session.id)

      // Create purchased features records
      const purchasedFeatures = featureIds.map(featureId => ({
        user_id,
        feature_id: featureId,
        status: 'active',
        purchased_at: new Date().toISOString(),
      }))

      const { error: purchaseError } = await supabaseClient
        .from('purchased_features')
        .insert(purchasedFeatures)

      if (purchaseError) {
        throw new Error('Failed to create purchased features')
      }

      console.log(`✅ Successfully processed payment for user ${user_id}`)
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
