        let scanResults = {
            score: 0,
            issues: [],
            stats: {}
        };

        async function startSEOCheck() {
            const urlInput = document.getElementById('urlInput');
            const url = urlInput.value.trim();

            if (!url) {
                showError('Please enter a valid URL');
                return;
            }

            let testUrl = url;
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                testUrl = 'https://' + url;
                urlInput.value = testUrl;
            }

            showLoading(true);
            hideError();

            try {
                await performSEOAnalysis(testUrl);
                showResults();
            } catch (error) {
                console.error('SEO analysis failed:', error);
                showError('Analysis failed: ' + error.message);
            } finally {
                showLoading(false);
            }
        }

        async function performSEOAnalysis(url) {
            const issues = [];
            let score = 100;
            const stats = { loadTime: 'Service Unavailable', pageSize: 'Service Unavailable' };

            updateLoadingStatus('Fetching page content...');

            // 1. Fetch page content
            const pageData = await fetchPageContent(url);
            
            // 2. Analyze page speed
            updateLoadingStatus('Checking page speed...');
            try {
                const speedData = await analyzePageSpeed(url);
                stats.loadTime = speedData.loadTime;
                stats.pageSize = speedData.pageSize;
                if (speedData.issues.length > 0) {
                    issues.push(...speedData.issues);
                    score -= speedData.issues.length * 10;
                }
            } catch (error) {
                // Add an issue to indicate PageSpeed service is unavailable
                issues.push({
                    type: 'critical',
                    title: '🚫 PageSpeed Service Unavailable',
                    description: 'Unable to analyze page performance metrics due to service unavailability.',
                    guidance: `Error: ${error.message}. This prevents load time and page size analysis.`
                });
                score -= 20; // Penalty for missing critical data
            }

            // 3. Analyze HTML content
            updateLoadingStatus('Analyzing HTML structure...');
            const htmlIssues = analyzeHTML(pageData.html, url);
            issues.push(...htmlIssues);
            score -= htmlIssues.filter(i => i.type === 'critical').length * 15;
            score -= htmlIssues.filter(i => i.type === 'warning').length * 8;

            // 4. Check for broken links
            updateLoadingStatus('Checking for broken links...');
            try {
                const linkIssues = await checkLinks(pageData.html, url);
                issues.push(...linkIssues);
                score -= linkIssues.length * 12;
            } catch (error) {
                // Add an issue to indicate link checking service is unavailable
                issues.push({
                    type: 'warning',
                    title: '🔗 Link Checking Service Unavailable',
                    description: 'Unable to verify link validity due to service unavailability.',
                    guidance: `Error: ${error.message}. Manual link verification recommended.`
                });
                score -= 10; // Penalty for missing link analysis
            }

            scanResults = {
                url,
                score: Math.max(score, 0),
                issues,
                stats: {
                    ...stats,
                    issuesFound: issues.length
                }
            };
        }

        async function fetchPageContent(url) {
            try {
                // Use backend API to fetch content (handles CORS automatically)
                const response = await fetch('/api/fetch-content', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url })
                });
                
                if (!response.ok) {
                    throw new Error(`Backend fetch failed: ${response.status} - ${response.statusText}`);
                }
                
                const data = await response.json();
                return { html: data.html, status: data.status };
            } catch (error) {
                // No fallback - throw error to caller to handle properly
                throw new Error(`Failed to fetch page content: ${error.message}`);
            }
        }



        async function analyzePageSpeed(url) {
            try {
                // Use the backend API endpoint instead of directly calling PageSpeed API
                const response = await fetch('/api/pagespeed', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url })
                });
                
                if (!response.ok) {
                    // Return error information instead of null
                    throw new Error(`PageSpeed API failed: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                
                // Check if service is unavailable
                if (data._serviceStatus === 'unavailable') {
                    return {
                        loadTime: 'Service Unavailable',
                        pageSize: 'Service Unavailable',
                        issues: [{
                            type: 'warning',
                            title: '⚠️ PageSpeed Analysis Unavailable',
                            description: 'Google PageSpeed Insights API is currently unavailable. Performance metrics cannot be retrieved.',
                            guidance: 'Try again later when the service is available. SEO analysis will continue with other checks.'
                        }]
                    };
                }
                
                const lighthouse = data.lighthouseResult;
                const audits = lighthouse.audits;
                
                const issues = [];
                const loadTime = audits['speed-index']?.displayValue || 'Unknown';
                const pageSize = Math.round(lighthouse.audits['total-byte-weight']?.numericValue / 1024) || 0;

                // Check performance issues only if we have valid data
                if (audits['speed-index']?.score !== null && audits['speed-index']?.score < 0.5) {
                    issues.push({
                        type: 'critical',
                        title: '⚠️ Slow Page Load Speed',
                        description: `Page loads in ${loadTime}. This affects user experience and SEO rankings.`,
                        guidance: 'Optimize images, minify CSS/JS, enable compression, and use a CDN.'
                    });
                }

                if (audits['largest-contentful-paint']?.score !== null && audits['largest-contentful-paint']?.score < 0.5) {
                    issues.push({
                        type: 'warning',
                        title: '🖼️ Large Contentful Paint Issues',
                        description: 'Largest contentful paint is slower than recommended.',
                        guidance: 'Optimize above-the-fold content loading and reduce render-blocking resources.'
                    });
                }

                return {
                    loadTime,
                    pageSize: pageSize + ' KB',
                    issues
                };

            } catch (error) {
                // No fallback - throw error to indicate PageSpeed analysis failed
                throw new Error(`PageSpeed analysis failed: ${error.message}`);
            }
        }

        function analyzeHTML(html, url) {
            const issues = [];
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Check title tag
            const title = doc.querySelector('title');
            if (!title || !title.textContent.trim()) {
                issues.push({
                    type: 'critical',
                    title: '❌ Missing Title Tag',
                    description: 'No title tag found on this page.',
                    guidance: 'Add a unique, descriptive title tag (50-60 characters) to improve SEO.'
                });
            } else if (title.textContent.length < 30 || title.textContent.length > 60) {
                issues.push({
                    type: 'warning',
                    title: '⚠️ Title Tag Length Issue',
                    description: `Title tag is ${title.textContent.length} characters. Optimal length is 50-60 characters.`,
                    guidance: 'Adjust title tag length to 50-60 characters for better search result display.'
                });
            }

            // Check meta description
            const metaDesc = doc.querySelector('meta[name="description"]');
            if (!metaDesc || !metaDesc.getAttribute('content')) {
                issues.push({
                    type: 'critical',
                    title: '❌ Missing Meta Description',
                    description: 'No meta description found on this page.',
                    guidance: 'Add a unique meta description (150-160 characters) describing the page content.'
                });
            } else {
                const descLength = metaDesc.getAttribute('content').length;
                if (descLength < 120 || descLength > 160) {
                    issues.push({
                        type: 'warning',
                        title: '📝 Meta Description Length Issue',
                        description: `Meta description is ${descLength} characters. Optimal length is 150-160 characters.`,
                        guidance: 'Adjust meta description length to 150-160 characters for better search snippets.'
                    });
                }
            }

            // Check for h1 tags
            const h1Tags = doc.querySelectorAll('h1');
            if (h1Tags.length === 0) {
                issues.push({
                    type: 'critical',
                    title: '❌ Missing H1 Tag',
                    description: 'No H1 heading tag found on this page.',
                    guidance: 'Add a single, descriptive H1 tag to define the main topic of the page.'
                });
            } else if (h1Tags.length > 1) {
                issues.push({
                    type: 'warning',
                    title: '⚠️ Multiple H1 Tags',
                    description: `Found ${h1Tags.length} H1 tags. Best practice is to use only one H1 per page.`,
                    guidance: 'Use only one H1 tag per page and structure other headings with H2-H6.'
                });
            }

            // Check for images without alt text
            const images = doc.querySelectorAll('img');
            const imagesWithoutAlt = Array.from(images).filter(img => !img.getAttribute('alt'));
            if (imagesWithoutAlt.length > 0) {
                issues.push({
                    type: 'warning',
                    title: '🖼️ Images Missing Alt Text',
                    description: `${imagesWithoutAlt.length} images are missing alt text attributes.`,
                    guidance: 'Add descriptive alt text to all images for accessibility and SEO benefits.'
                });
            }

            // Check for canonical URL
            const canonical = doc.querySelector('link[rel="canonical"]');
            if (!canonical) {
                issues.push({
                    type: 'warning',
                    title: '🔗 Missing Canonical URL',
                    description: 'No canonical URL specified for this page.',
                    guidance: 'Add a canonical link tag to prevent duplicate content issues.'
                });
            }

            // Check for viewport meta tag
            const viewport = doc.querySelector('meta[name="viewport"]');
            if (!viewport) {
                issues.push({
                    type: 'warning',
                    title: '📱 Missing Viewport Meta Tag',
                    description: 'No viewport meta tag found, affecting mobile responsiveness.',
                    guidance: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> for mobile optimization.'
                });
            }

            // Check for structured data
            const jsonLd = doc.querySelectorAll('script[type="application/ld+json"]');
            const microdata = doc.querySelectorAll('[itemscope]');
            if (jsonLd.length === 0 && microdata.length === 0) {
                issues.push({
                    type: 'warning',
                    title: '📊 Missing Structured Data',
                    description: 'No structured data (Schema.org) markup found.',
                    guidance: 'Add JSON-LD structured data to help search engines understand your content better.'
                });
            }

            return issues;
        }

        async function checkLinks(html, baseUrl) {
            const issues = [];
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const links = doc.querySelectorAll('a[href]');
            const internalLinks = [];

            // Find internal links
            Array.from(links).forEach(link => {
                const href = link.getAttribute('href');
                if (href && (href.startsWith('/') || href.includes(new URL(baseUrl).hostname))) {
                    let fullUrl = href;
                    if (href.startsWith('/')) {
                        fullUrl = new URL(href, baseUrl).toString();
                    }
                    internalLinks.push(fullUrl);
                }
            });

            // Check a sample of internal links (limit to 5 to avoid too many requests)
            const linksToCheck = internalLinks.slice(0, 5);
            const brokenLinks = [];
            let apiFailureCount = 0;

            for (const link of linksToCheck) {
                try {
                    // Use backend API to check links (handles CORS automatically)
                    const response = await fetch('/api/check-link', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ url: link })
                    });
                    
                    if (!response.ok) {
                        apiFailureCount++;
                        continue;
                    }
                    
                    const data = await response.json();
                    if (!data.ok && data.status >= 400) {
                        brokenLinks.push(link);
                    }
                } catch (error) {
                    apiFailureCount++;
                }
            }

            // If all API calls failed, throw error to indicate service unavailability
            if (apiFailureCount === linksToCheck.length && linksToCheck.length > 0) {
                throw new Error('Link checking service is unavailable - unable to verify link validity');
            }

            if (brokenLinks.length > 0) {
                issues.push({
                    type: 'critical',
                    title: '🔗 Broken Internal Links',
                    description: `Found ${brokenLinks.length} broken internal links that return errors.`,
                    guidance: 'Fix broken links by updating URLs or setting up proper redirects (301).',
                    details: brokenLinks.slice(0, 3).join(', ')
                });
            }

            return issues;
        }

        function showResults() {
            document.getElementById('overallScore').textContent = scanResults.score;
            document.getElementById('loadTime').textContent = scanResults.stats.loadTime || 'Unknown';
            document.getElementById('issuesFound').textContent = scanResults.stats.issuesFound;
            document.getElementById('pageSize').textContent = scanResults.stats.pageSize || 'Unknown';

            const issuesGrid = document.getElementById('issuesGrid');
            issuesGrid.innerHTML = '';

            if (scanResults.issues.length === 0) {
                const noIssuesCard = document.createElement('div');
                noIssuesCard.className = 'issue-card';
                noIssuesCard.innerHTML = `
                    <div class="issue-header good">
                        ✅ Excellent SEO Health!
                    </div>
                    <div class="issue-body">
                        <div class="issue-description">
                            No major SEO issues found on this page. Your website appears to be well-optimized!
                        </div>
                        <div class="guidance">
                            💡 Continue monitoring your site regularly and keep content fresh and relevant.
                        </div>
                    </div>
                `;
                issuesGrid.appendChild(noIssuesCard);
            } else {
                scanResults.issues.forEach(issue => {
                    const issueCard = createIssueCard(issue);
                    issuesGrid.appendChild(issueCard);
                });
            }

            document.getElementById('resultsDiv').classList.add('active');
        }

        function createIssueCard(issue) {
            const card = document.createElement('div');
            card.className = 'issue-card';

            card.innerHTML = `
                <div class="issue-header ${issue.type}">
                    ${issue.title}
                </div>
                <div class="issue-body">
                    <div class="issue-description">
                        ${issue.description}
                        ${issue.details ? `<br><small><strong>Details:</strong> ${issue.details}</small>` : ''}
                    </div>
                    <div class="guidance">
                        💡 <strong>Recommendation:</strong> ${issue.guidance}
                    </div>
                </div>
            `;

            return card;
        }

        function showLoading(show) {
            const loading = document.getElementById('loadingDiv');
            const scanBtn = document.getElementById('scanBtn');
            
            if (show) {
                loading.classList.add('active');
                document.getElementById('resultsDiv').classList.remove('active');
                scanBtn.disabled = true;
                scanBtn.textContent = 'Analyzing...';
            } else {
                loading.classList.remove('active');
                scanBtn.disabled = false;
                scanBtn.textContent = 'Analyze Site';
            }
        }

        function updateLoadingStatus(status) {
            document.getElementById('loadingStatus').textContent = status;
        }

        function showError(message) {
            const errorDiv = document.getElementById('errorMessage');
            errorDiv.textContent = message;
            errorDiv.classList.add('active');
        }

        function hideError() {
            document.getElementById('errorMessage').classList.remove('active');
        }

        // Handle Enter key press
        document.getElementById('urlInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                startSEOCheck();
            }
        });