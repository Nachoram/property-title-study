import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RAILWAY_WEBHOOK_URL = "https://primary-production-8955.up.railway.app/webhook/4cd8445c-db58-498c-8f9b-ffb4e6cd2fcb";

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
        console.log("Function start-title-study invoked");
        const payload = await req.json();

        console.log(`Forwarding to URL: ${RAILWAY_WEBHOOK_URL}`);
        console.log("Payload received:", JSON.stringify(payload, null, 2));

        console.log("Sending fetch request to Railway...");
        const response = await fetch(RAILWAY_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        console.log(`Railway fetch complete. Status: ${response.status}`);
        const result = await response.text();
        console.log("Railway response body:", result);

        if (!response.ok) {
            console.error(`Railway webhook failed with status ${response.status}: ${result}`);
            // We might still want to return success to the client but log the error, 
            // or return error. Let's return the details.
        }

        return new Response(JSON.stringify({
            success: response.ok,
            railwayStatus: response.status,
            railwayResponse: result
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });

    } catch (err: unknown) {
        const error = err as Error;
        console.error("CRITICAL Error in Edge Function:", error);
        return new Response(JSON.stringify({ error: error.message, stack: error.stack }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
        });
    }
});
