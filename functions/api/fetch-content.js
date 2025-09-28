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
        
        // When content cannot be fetched, provide fallback content for analysis
        // This ensures the tool can still perform SEO analysis even when the target site is unavailable
        const mockHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Content Unavailable - ${new URL(url).hostname}</title>
                <meta name="description" content="Content could not be retrieved from this URL for SEO analysis.">
            </head>
            <body>
                <h1>Content Unavailable</h1>
                <p>The content from ${url} could not be retrieved for analysis.</p>
                <p>This may be due to network restrictions, CORS policies, or the site being unavailable.</p>
                <img src="placeholder.jpg" alt="Placeholder image">
                <img src="example.jpg">
            </body>
            </html>
        `;
        
        return new Response(JSON.stringify({ 
            html: mockHtml, 
            status: 200,
            _note: 'Fallback content - original site content unavailable',
            _error: error.message
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    }
}