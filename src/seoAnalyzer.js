/**
 * SEO Analysis Functions - Testable Module
 * This module exports the core SEO analysis functions for testing
 */

/**
 * Analyzes HTML content for SEO issues
 * @param {string} html - The HTML content to analyze
 * @param {string} url - The URL being analyzed
 * @returns {Array} Array of SEO issues found
 */
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
            description: 'No H1 tag found on this page.',
            guidance: 'Add exactly one H1 tag to define the main heading of the page.'
        });
    } else if (h1Tags.length > 1) {
        issues.push({
            type: 'warning',
            title: '⚠️ Multiple H1 Tags',
            description: `Found ${h1Tags.length} H1 tags. Best practice is to use only one H1 per page.`,
            guidance: 'Use only one H1 tag per page and use H2-H6 for subheadings.'
        });
    }

    // Check for images without alt text
    const images = doc.querySelectorAll('img');
    if (images.length > 0) {
        const imagesWithoutAlt = Array.from(images).filter(img => !img.getAttribute('alt'));
        if (imagesWithoutAlt.length > 0) {
            issues.push({
                type: 'warning',
                title: '🖼️ Images Missing Alt Text',
                description: `${imagesWithoutAlt.length} images are missing alt text attributes.`,
                guidance: 'Add descriptive alt text to all images for accessibility and SEO benefits.'
            });
        }
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
    const structuredData = doc.querySelector('script[type="application/ld+json"]') || 
                          doc.querySelector('[itemscope]');
    if (!structuredData) {
        issues.push({
            type: 'info',
            title: '📊 No Structured Data Found',
            description: 'No Schema.org structured data detected.',
            guidance: 'Consider adding structured data markup to help search engines understand your content better.'
        });
    }

    return issues;
}

/**
 * Validates URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if URL is valid
 */
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Normalizes URL (adds https:// if missing protocol)
 * @param {string} url - URL to normalize
 * @returns {string} Normalized URL
 */
function normalizeURL(url) {
    if (!url) return '';
    
    const trimmedUrl = url.trim();
    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
        return 'https://' + trimmedUrl;
    }
    return trimmedUrl;
}

/**
 * Calculates SEO score based on issues
 * @param {Array} issues - Array of SEO issues
 * @returns {number} SEO score (0-100)
 */
function calculateSEOScore(issues) {
    let score = 100;
    
    issues.forEach(issue => {
        switch(issue.type) {
            case 'critical':
                score -= 15;
                break;
            case 'warning':
                score -= 8;
                break;
            case 'info':
                score -= 3;
                break;
        }
    });
    
    return Math.max(0, score);
}

// Export functions for testing (Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        analyzeHTML,
        isValidURL,
        normalizeURL,
        calculateSEOScore
    };
}