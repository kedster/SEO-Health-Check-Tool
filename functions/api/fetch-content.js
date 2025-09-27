/**
 * Cloudflare Pages Function for fetching page content
 * Replaces the Express.js /api/fetch-content endpoint
 */

export default async function handler(request, env, context) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    }

    if (request.method !== 'POST') {
        return new Response('Method not allowed', { 
            status: 405,
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        });
    }

    try {
        const { url } = await request.json();
        
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

        // Use Cloudflare's fetch to get content directly (no CORS proxy needed)
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'SEO-Health-Check-Tool/1.0 (Cloudflare Pages Function)',
            },
        });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch content: ${response.status} ${response.statusText}`);
        }

        const html = await response.text();
        
        return new Response(JSON.stringify({ 
            html, 
            status: response.status 
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
        
    } catch (error) {
        console.error('Content fetch error:', error);
        return new Response(JSON.stringify({ 
            error: 'Failed to fetch page content',
            details: error.message 
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    }
}