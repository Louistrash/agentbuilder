
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const whatsappApiKey = Deno.env.get('WHATSAPP_API_KEY');
const whatsappApiUrl = "https://graph.facebook.com/v17.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phoneNumber, message } = await req.json();

    if (!phoneNumber || !message) {
      throw new Error('Phone number and message are required');
    }

    // Format phone number (remove any non-numeric characters)
    const formattedPhone = phoneNumber.replace(/\D/g, '');

    // Send message using WhatsApp Business API
    const response = await fetch(`${whatsappApiUrl}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${whatsappApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: formattedPhone,
        type: "text",
        text: { 
          body: message 
        }
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('WhatsApp API Error:', data);
      throw new Error(data.error?.message || 'Failed to send WhatsApp message');
    }

    console.log('WhatsApp message sent successfully:', data);

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in whatsapp function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
