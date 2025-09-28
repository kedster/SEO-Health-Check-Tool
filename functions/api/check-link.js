/**
 * Cloudflare Pages Function for checking link validity
 * Replaces the Express.js /api/check-link endpoint
 */

export default async function handler(request, env, context) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    }

    // Support both GET and POST methods for flexibility
    if (request.method !== 'POST' && request.method !== 'GET') {
        return new Response('Method not allowed', { 
            status: 405,
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        });
    }

    try {
        let url;
        
        // Handle both GET and POST requests
        if (request.method === 'GET') {
            const urlParams = new URL(request.url).searchParams;
            url = urlParams.get('url');
        } else {
            try {
                const body = await request.json();
                url = body.url;
            } catch (jsonError) {
                return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                });
            }
        }
        
        if (!url) {
            return new Response(JSON.stringify({ error: 'URL is required' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
        }

        // Validate URL format
        try {
            new URL(url);
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Invalid URL format' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
        }

        // Check the link directly using Cloudflare's fetch
        const response = await fetch(url, {
            method: 'HEAD', // Use HEAD request to check status without downloading content
            headers: {
                'User-Agent': 'SEO-Health-Check-Tool/1.0 (Link Checker)',
            },
        });
        
        return new Response(JSON.stringify({ 
            ok: response.ok,
            status: response.status,
            statusText: response.statusText 
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
        
    } catch (error) {
        console.error('Link check error:', error);
        return new Response(JSON.stringify({ 
            error: 'Failed to check link',
            details: error.message,
            ok: false,
            status: 0
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    }
}