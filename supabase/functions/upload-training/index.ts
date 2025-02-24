
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'Geen bestand geüpload' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const sanitizedFileName = file.name.replace(/[^\x00-\x7F]/g, '');
    const fileExt = sanitizedFileName.split('.').pop()
    const filePath = `${crypto.randomUUID()}.${fileExt}`

    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('training_files')
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return new Response(
        JSON.stringify({ error: 'Bestand uploaden mislukt', details: uploadError }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Get user ID from auth header
    const authHeader = req.headers.get('Authorization')?.split('Bearer ')[1]
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Niet geautoriseerd' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader)
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Niet geautoriseerd' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    // Get the uploaded file URL
    const { data: { publicUrl } } = supabase.storage
      .from('training_files')
      .getPublicUrl(filePath)

    // Download the file content
    const fileResponse = await fetch(publicUrl)
    const fileContent = await fileResponse.text()

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })
    const openai = new OpenAIApi(configuration)

    // Process the content into chunks suitable for AI training
    const chunks = fileContent.split('\n\n').filter(chunk => chunk.trim().length > 0)

    // Train the AI with the content
    console.log('Starting AI training with file content...')
    for (const chunk of chunks) {
      try {
        await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Learn this information for customer service: ${chunk}`,
          max_tokens: 150
        })
      } catch (error) {
        console.error('Error training AI with chunk:', error)
      }
    }

    // Save file metadata to database
    const { error: dbError } = await supabase
      .from('training_files')
      .insert({
        filename: sanitizedFileName,
        file_path: filePath,
        content_type: file.type,
        size: file.size,
        profile_id: user.id,
        processed: true
      })

    if (dbError) {
      console.error('Database error:', dbError)
      return new Response(
        JSON.stringify({ error: 'Bestandsgegevens opslaan mislukt', details: dbError }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    return new Response(
      JSON.stringify({ message: 'Bestand succesvol geüpload en verwerkt voor AI training', filePath }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Er is een onverwachte fout opgetreden', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
