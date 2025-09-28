const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Store API key securely in environment variable
const PAGESPEED_API_KEY = process.env.PAGESPEED_API_KEY || 'AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw';

// CORS proxy URL - automatically handled server-side
const CORS_PROXY_URL = 'https://api.allorigins.win/raw?url=';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API endpoint for PageSpeed Insights
app.post('/api/pagespeed', async (req, res) => {
    try {
        const { url } = req.body;
        
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        // Validate URL format
        try {
            new URL(url);
        } catch (error) {
            return res.status(400).json({ error: 'Invalid URL format' });
        }

        // Make request to PageSpeed Insights API
        const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${PAGESPEED_API_KEY}&strategy=desktop`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`PageSpeed API request failed: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('PageSpeed API error:', error);
        res.status(500).json({ error: 'Failed to analyze page speed' });
    }
});

// API endpoint for fetching page content (replaces CORS proxy functionality)
app.post('/api/fetch-content', async (req, res) => {
    try {
        const { url } = req.body;
        
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        // Validate URL format
        try {
            new URL(url);
        } catch (error) {
            return res.status(400).json({ error: 'Invalid URL format' });
        }

        // Try to fetch content directly first (like Cloudflare Functions do)
        // If that fails due to CORS, then use CORS proxy as fallback
        let response;
        try {
            response = await fetch(url, {
                headers: {
                    'User-Agent': 'SEO-Health-Check-Tool/1.0 (Local Development)',
                },
            });
        } catch (directFetchError) {
            console.log('Direct fetch failed, trying CORS proxy:', directFetchError.message);
            try {
                // Fallback to CORS proxy
                response = await fetch(CORS_PROXY_URL + encodeURIComponent(url));
            } catch (corsProxyError) {
                console.log('CORS proxy also failed:', corsProxyError.message);
                // For development/testing when external services are unavailable,
                // return a simple HTML response so the tool can be tested
                if (process.env.NODE_ENV !== 'production') {
                    const mockHtml = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Test Page - ${new URL(url).hostname}</title>
                            <meta name="description" content="This is a test page for SEO analysis.">
                        </head>
                        <body>
                            <h1>Test Page</h1>
                            <p>This is a sample page for testing the SEO Health Check Tool.</p>
                            <a href="/about">About</a>
                            <a href="/contact">Contact</a>
                            <img src="test.jpg" alt="Test image">
                            <img src="test2.jpg">
                        </body>
                        </html>
                    `;
                    return res.json({ 
                        html: mockHtml, 
                        status: 200,
                        _note: 'Mock data for development - external services unavailable'
                    });
                }
                throw corsProxyError;
            }
        }
        
        if (!response.ok) {
            throw new Error(`Failed to fetch content: ${response.status}`);
        }

        const html = await response.text();
        res.json({ html, status: response.status });
    } catch (error) {
        console.error('Content fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch page content' });
    }
});

// API endpoint for checking links (replaces direct CORS proxy calls)
app.post('/api/check-link', async (req, res) => {
    try {
        const { url } = req.body;
        
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        // Validate URL format
        try {
            new URL(url);
        } catch (error) {
            return res.status(400).json({ error: 'Invalid URL format' });
        }

        // Try to check link directly first (like Cloudflare Functions do)
        // If that fails due to CORS, then use CORS proxy as fallback
        let response;
        try {
            response = await fetch(url, {
                method: 'HEAD',
                headers: {
                    'User-Agent': 'SEO-Health-Check-Tool/1.0 (Local Development)',
                },
            });
        } catch (directFetchError) {
            console.log('Direct HEAD request failed, trying CORS proxy:', directFetchError.message);
            try {
                // Fallback to CORS proxy
                response = await fetch(CORS_PROXY_URL + encodeURIComponent(url), {
                    method: 'HEAD'
                });
            } catch (corsProxyError) {
                console.log('CORS proxy also failed for link check:', corsProxyError.message);
                // For development/testing when external services are unavailable
                if (process.env.NODE_ENV !== 'production') {
                    return res.json({ 
                        ok: true, 
                        status: 200,
                        statusText: 'OK (Mock response)',
                        _note: 'Mock data for development - external services unavailable'
                    });
                }
                throw corsProxyError;
            }
        }
        
        res.json({ 
            ok: response.ok, 
            status: response.status,
            statusText: response.statusText 
        });
    } catch (error) {
        console.error('Link check error:', error);
        res.json({ 
            ok: false, 
            status: 0,
            statusText: 'Network error',
            error: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to use the SEO Health Check Tool`);
});