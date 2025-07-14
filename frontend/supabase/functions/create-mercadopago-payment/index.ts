
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, description, user_email, user_id } = await req.json();

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get Mercado Pago access token from secrets
    const mercadoPagoToken = Deno.env.get('MERCADO_PAGO_ACCESS_TOKEN');
    if (!mercadoPagoToken) {
      throw new Error('Mercado Pago access token not configured');
    }

    // Create payment preference in Mercado Pago
    const preference = {
      items: [
        {
          title: description,
          quantity: 1,
          unit_price: amount / 100, // Convert from cents to reais
          currency_id: 'BRL'
        }
      ],
      payer: {
        email: user_email
      },
      back_urls: {
        success: `${req.headers.get('origin')}/payment-success`,
        failure: `${req.headers.get('origin')}/payment-failure`,
        pending: `${req.headers.get('origin')}/payment-pending`
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12
      },
      external_reference: user_id,
      notification_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/mercadopago-webhook`
    };

    const mercadoPagoResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mercadoPagoToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preference)
    });

    if (!mercadoPagoResponse.ok) {
      throw new Error(`Mercado Pago API error: ${mercadoPagoResponse.status}`);
    }

    const mercadoPagoData = await mercadoPagoResponse.json();

    // Store payment record in database
    const { error: dbError } = await supabaseClient
      .from('vip_payments')
      .insert({
        user_id: user_id,
        amount: amount,
        currency: 'brl',
        status: 'pending',
        stripe_session_id: mercadoPagoData.id // Using this field for MP preference ID
      });

    if (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }

    return new Response(
      JSON.stringify({
        payment_url: mercadoPagoData.init_point,
        preference_id: mercadoPagoData.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
