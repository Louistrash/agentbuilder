
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12.7.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (userError || !user) {
      throw new Error('Invalid token')
    }

    const { cart, successUrl, cancelUrl } = await req.json()

    // Fetch features from database
    const { data: features, error: featuresError } = await supabaseClient
      .from('marketplace_features')
      .select('*')
      .in('id', cart)

    if (featuresError || !features) {
      throw new Error('Failed to fetch features')
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: features.map((feature) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: feature.name,
            description: feature.description,
          },
          unit_amount: Math.round(feature.price * 100), // Convert to cents
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: user.email,
      metadata: {
        user_id: user.id,
        features: JSON.stringify(cart),
      },
    })

    // Create transaction record
    const { error: transactionError } = await supabaseClient
      .from('marketplace_transactions')
      .insert({
        user_id: user.id,
        stripe_session_id: session.id,
        amount: features.reduce((sum, feature) => sum + feature.price, 0),
      })

    if (transactionError) {
      throw new Error('Failed to create transaction')
    }

    return new Response(
      JSON.stringify({ sessionId: session.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
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
