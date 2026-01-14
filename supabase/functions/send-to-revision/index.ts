import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RAILWAY_WEBHOOK_URL = "https://primary-production-8955.up.railway.app/webhook/bbca2bad-06ce-4202-8fb6-dd423f1e2bb2";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const payload = await req.json();

        console.log("Forwarding payload to Railway:", payload);

        const response = await fetch(RAILWAY_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.text();
        console.log("Railway response:", result);

        return new Response(JSON.stringify({ success: true, railwayResponse: result }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });

    } catch (error) {
        console.error("Error in Edge Function:", error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
        });
    }
});
