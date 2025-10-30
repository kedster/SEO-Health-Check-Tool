/**
 * Cloudflare Pages Function for PageSpeed Insights API
 * Replaces the Express.js /api/pagespeed endpoint
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

        // Get API key from environment variables (set in Cloudflare Pages settings)
        const PAGESPEED_API_KEY = env.PAGESPEED_API_KEY;
        
        if (!PAGESPEED_API_KEY) {
            return new Response(JSON.stringify({ 
                error: 'PageSpeed API key not configured' 
            }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
        }

        // Make request to PageSpeed Insights API
        const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${PAGESPEED_API_KEY}&strategy=desktop`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`PageSpeed API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
        
    } catch (error) {
        console.error('PageSpeed API error:', error);
        
        // Instead of returning 500 error, return a mock response that indicates
        // the service is unavailable but allows the analysis to continue
        const mockResponse = {
            lighthouseResult: {
                audits: {
                    'speed-index': {
                        displayValue: 'Service Unavailable',
                        score: null
                    },
                    'total-byte-weight': {
                        numericValue: 0
                    },
                    'largest-contentful-paint': {
                        score: null
                    }
                }
            },
            _serviceStatus: 'unavailable',
            _error: error.message
        };
        
        return new Response(JSON.stringify(mockResponse), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    }
}