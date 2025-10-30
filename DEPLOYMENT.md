# 🚀 Deployment Guide

This SEO Health Check Tool can be deployed using multiple methods. The recommended approach for production is **Cloudflare Pages** for best performance and reliability.

## 🌟 Recommended: Cloudflare Pages (with Functions) - GUI Guide

Cloudflare Pages provides excellent performance, global CDN, and serverless functions to handle API calls without CORS issues.

### 📋 Prerequisites

Before you begin, ensure you have:
- A GitHub account
- A Cloudflare account (free tier available at [dash.cloudflare.com](https://dash.cloudflare.com))
- API keys for enhanced features (see [API Configuration](#-api-configuration) section)

### 🎯 Step-by-Step Deployment Using Cloudflare Dashboard

#### Step 1: Fork the Repository

1. Go to the [SEO Health Check Tool repository](https://github.com/kedster/SEO-Health-Check-Tool)
2. Click the **"Fork"** button in the top right corner
3. Select your GitHub account as the destination
4. Wait for the fork to complete

#### Step 2: Create Cloudflare Account (if needed)

1. Visit [Cloudflare Dashboard](https://dash.cloudflare.com/sign-up)
2. Sign up with your email or use GitHub/Google authentication
3. Verify your email address
4. You'll be on the free plan by default (perfect for this project!)

#### Step 3: Connect GitHub to Cloudflare Pages

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. In the left sidebar, click **"Workers & Pages"**
3. Click the **"Create application"** button
4. Select the **"Pages"** tab
5. Click **"Connect to Git"**
6. Choose **"GitHub"** as your Git provider
7. Click **"Connect GitHub"** and authorize Cloudflare to access your repositories
8. Select your forked **"SEO-Health-Check-Tool"** repository from the list

#### Step 4: Configure Build Settings

On the "Set up builds and deployments" page, configure the following settings:

**Project name:**
- Enter a custom name (e.g., `seo-health-checker` or `my-seo-tool`)
- This will be your subdomain: `your-project-name.pages.dev`

**Production branch:**
- Keep as `main` (or `master` depending on your repository)

**Framework preset:**
- Select **"None"** from the dropdown

**Build command:**
- Leave **empty** or enter: `echo "No build required"`

**Build output directory:**
- Enter: `/` (forward slash for root directory)

**Root directory (optional):**
- Leave **blank** (or enter `/` for root)

> 💡 **Why these settings?** This is a static site with Cloudflare Functions. No build process is needed - files are served directly from the repository root.

#### Step 5: Configure Environment Variables

Before deploying, set up your API keys for enhanced functionality:

1. Scroll down to **"Environment variables (advanced)"**
2. Click **"Add variable"** for each API key you want to configure

**Required for Full Functionality:**

| Variable Name | Description | Where to Get |
|--------------|-------------|--------------|
| `PAGESPEED_API_KEY` | Google PageSpeed Insights API | [Get API Key](#1-google-pagespeed-insights-api-required) |

**Optional but Recommended for Enhanced Features:**

| Variable Name | Description | Where to Get |
|--------------|-------------|--------------|
| `OPENAI_API_KEY` | ChatGPT API for AI-powered SEO recommendations | [Get API Key](#2-openai-chatgpt-api-optional) |
| `GOOGLE_SEARCH_CONSOLE_API_KEY` | Google Search Console data | [Get API Key](#3-google-search-console-api-optional) |
| `W3C_VALIDATOR_API_KEY` | HTML/CSS validation (usually not needed - public endpoint) | [W3C Validator](https://validator.w3.org/) |

**For each variable:**
- Enter the **Variable name** (e.g., `PAGESPEED_API_KEY`)
- Enter the **Value** (your actual API key)
- Select **"Encrypt"** for security
- Leave deployment type as **"Production"** (or add for both Production and Preview)

> 🔒 **Security Note:** Environment variables are encrypted and never exposed to the frontend. They're only accessible by Cloudflare Functions.

#### Step 6: Deploy Your Site

1. Review all settings to ensure they're correct
2. Click **"Save and Deploy"** button at the bottom
3. Wait for the deployment to complete (usually 30-60 seconds)
4. You'll see a success message with your live URL: `https://your-project-name.pages.dev`

#### Step 7: Test Your Deployment

1. Click the provided URL or the **"Continue to project"** button
2. On the project page, click **"Visit site"**
3. Test the SEO checker with a sample URL (e.g., `https://example.com`)
4. Verify that all features work correctly

#### Step 8: Add Environment Variables After Deployment (if needed)

If you skipped API keys during initial setup:

1. Go to your project in Cloudflare Dashboard
2. Click **"Settings"** tab
3. Scroll to **"Environment variables"**
4. Click **"Add variables"**
5. Add your API keys as described in Step 5
6. Click **"Save"**
7. Redeploy your site:
   - Go to **"Deployments"** tab
   - Click **"⋯"** (three dots) on the latest deployment
   - Select **"Retry deployment"**

### Features with Cloudflare Pages:
- ✅ **No CORS issues** - Functions handle API calls server-side
- ✅ **Global CDN** - Fast loading worldwide  
- ✅ **Automatic HTTPS** - SSL certificates included
- ✅ **Environment variables** - Secure API key storage
- ✅ **Custom domains** - Use your own domain name
- ✅ **Unlimited bandwidth** - No bandwidth limits on free tier
- ✅ **500 builds/month** - Generous free tier limits

## 🛠️ Alternative: Traditional Server Deployment

### Using Node.js (Express Server)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env and add your PAGESPEED_API_KEY
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Access the tool:**
   Open `http://localhost:3000`

### Using Docker

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and run:**
   ```bash
   docker build -t seo-health-check .
   docker run -p 3000:3000 -e PAGESPEED_API_KEY=your_key seo-health-check
   ```

## 🔧 API Configuration

This section provides detailed instructions for obtaining all API keys that enhance the SEO Health Check Tool's functionality. All these APIs offer free tiers that are perfect for personal use and small-scale deployments.

### 1. Google PageSpeed Insights API (Required)

**What it does:** Provides comprehensive performance metrics, load times, and optimization suggestions.

**Free Tier:** 400 queries per day (25,000/day with free trial credits)

**Setup Instructions:**

1. **Go to Google Cloud Console**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Sign in with your Google account

2. **Create or Select a Project**
   - Click the project dropdown at the top
   - Click **"New Project"**
   - Enter project name (e.g., "SEO Health Checker")
   - Click **"Create"**

3. **Enable PageSpeed Insights API**
   - In the search bar, type "PageSpeed Insights API"
   - Click on **"PageSpeed Insights API"**
   - Click **"Enable"** button
   - Wait for API to be enabled (5-10 seconds)

4. **Create API Credentials**
   - In the left sidebar, click **"Credentials"**
   - Click **"+ CREATE CREDENTIALS"** at the top
   - Select **"API key"**
   - Your API key will be generated (format: `AIzaSy...`)
   - Click **"Edit API key"** to add restrictions (recommended)

5. **Restrict API Key (Recommended for Security)**
   - Under "API restrictions", select **"Restrict key"**
   - Check **"PageSpeed Insights API"**
   - Under "Application restrictions", you can:
     - Select **"HTTP referrers"** and add your domain: `*.pages.dev/*` and your custom domain
     - Or keep as "None" for testing
   - Click **"Save"**

6. **Copy Your API Key**
   - Copy the API key (starts with `AIzaSy...`)
   - Add to Cloudflare Pages environment variables as `PAGESPEED_API_KEY`

**Testing:** You can test your API key with this URL:
```
https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://example.com&key=YOUR_API_KEY
```

### 2. OpenAI ChatGPT API (Optional)

**What it does:** Provides AI-powered SEO recommendations, content quality analysis, and optimization suggestions.

**Free Tier:** $5 free credits for new users (expires after 3 months), then pay-as-you-go (GPT-3.5-turbo is very affordable at $0.002/1K tokens)

**Setup Instructions:**

1. **Create OpenAI Account**
   - Visit [OpenAI Platform](https://platform.openai.com/signup)
   - Sign up with email or Google/Microsoft account
   - Verify your email

2. **Add Payment Method (Required after free credits)**
   - Go to [Billing](https://platform.openai.com/account/billing)
   - Click **"Add payment method"**
   - Enter credit card details
   - Set usage limits to control costs (recommended: $5-10/month)

3. **Create API Key**
   - Go to [API Keys](https://platform.openai.com/api-keys)
   - Click **"+ Create new secret key"**
   - Give it a name (e.g., "SEO Health Checker")
   - Click **"Create secret key"**
   - **Important:** Copy the key immediately (starts with `sk-...`)
   - You won't be able to see it again!

4. **Add to Environment Variables**
   - In Cloudflare Pages, add variable `OPENAI_API_KEY`
   - Paste your API key as the value

**Cost Estimation for SEO Tool:**
- GPT-3.5-turbo: ~$0.002 per SEO analysis
- GPT-4: ~$0.02 per SEO analysis (more detailed but pricier)
- Recommendation: Use GPT-3.5-turbo for cost-effectiveness

**Usage Tips:**
- Set monthly spending limits in OpenAI dashboard
- Monitor usage in the [Usage](https://platform.openai.com/account/usage) page
- Consider caching responses to reduce API calls

### 3. Google Search Console API (Optional)

**What it does:** Access search analytics data, indexed pages count, search queries, impressions, and click-through rates.

**Free Tier:** Completely free (no limits for personal use)

**Setup Instructions:**

1. **Verify Your Website in Google Search Console**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Click **"Add property"**
   - Enter your website URL
   - Choose verification method (HTML file, DNS, or Google Analytics)
   - Complete verification

2. **Enable Search Console API**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Use the same project from PageSpeed setup or create new one
   - Search for "Google Search Console API"
   - Click **"Enable"**

3. **Create OAuth 2.0 Credentials**
   - Go to **Credentials** in Cloud Console
   - Click **"+ CREATE CREDENTIALS"**
   - Select **"OAuth client ID"**
   - Configure OAuth consent screen if prompted:
     - User Type: **External**
     - App name: "SEO Health Checker"
     - Add your email
     - Save and continue
   - Application type: **Web application**
   - Authorized redirect URIs: Add your Cloudflare Pages URL
   - Click **"Create"**
   - Download the credentials JSON file

4. **Add to Environment Variables**
   - Add `GOOGLE_SEARCH_CONSOLE_CLIENT_ID`
   - Add `GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET`
   - (Values from the downloaded JSON file)

**Note:** This requires implementing OAuth flow in your application. For now, this is documented for future enhancement.

### 4. W3C Markup Validator (Optional)

**What it does:** Validates HTML and CSS markup for standards compliance and SEO-friendly structure.

**Free Tier:** Completely free, no API key required!

**Setup Instructions:**

No setup needed! The W3C Validator has a public API that can be used directly:

**API Endpoint:** `https://validator.w3.org/nu/?out=json`

**Usage:** Send POST request with HTML content to validate

**Rate Limits:** Be respectful of the service (don't abuse it with too many rapid requests)

### 5. SSL Labs API (Optional)

**What it does:** Tests SSL/TLS configuration and provides security scores for HTTPS sites.

**Free Tier:** Completely free with rate limits

**Setup Instructions:**

No API key required! Use the public API:

**API Endpoint:** `https://api.ssllabs.com/api/v3/`

**Rate Limits:**
- One assessment per host every 2 minutes
- Maximum 25 assessments per day per client IP

**Usage Tips:**
- Cache results for at least 24 hours
- Respect rate limits to avoid being blocked
- Read the [SSL Labs API docs](https://github.com/ssllabs/ssllabs-scan/blob/master/ssllabs-api-docs-v3.md)

### 6. Additional Free APIs for Future Enhancements

#### Bing Webmaster Tools API (Free)
- Similar to Google Search Console
- Get search analytics from Bing
- Requires site verification
- API docs: [Bing Webmaster API](https://www.bing.com/webmasters/help/Webmaster-APIs-51e0d25a)

#### Clearbit Logo API (Free)
- Fetch company logos for visual enhancement
- No API key for basic usage
- Endpoint: `https://logo.clearbit.com/domain.com`

#### Hunter.io Email Finder (Free Tier)
- Find contact emails on websites
- 25 free searches per month
- Useful for outreach analysis

### API Keys Summary for Cloudflare Pages

Here's a complete list of environment variables you can configure in Cloudflare Pages:

| Variable Name | Required? | Free Tier | Where to Get |
|--------------|-----------|-----------|--------------|
| `PAGESPEED_API_KEY` | **Required** | 400 queries/day | [Google Cloud Console](#1-google-pagespeed-insights-api-required) |
| `OPENAI_API_KEY` | Optional | $5 free credits | [OpenAI Platform](#2-openai-chatgpt-api-optional) |
| `GOOGLE_SEARCH_CONSOLE_CLIENT_ID` | Optional | Unlimited | [Google Cloud Console](#3-google-search-console-api-optional) |
| `GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET` | Optional | Unlimited | [Google Cloud Console](#3-google-search-console-api-optional) |

### Cost Optimization Tips

**To maximize free usage:**

1. **Cache API responses** where possible
2. **Set daily limits** in API provider dashboards
3. **Monitor usage** regularly to avoid surprises
4. **Use efficient models** (GPT-3.5 instead of GPT-4 when possible)
5. **Implement rate limiting** in your application
6. **Consider request batching** for multiple checks

**Free Tier Estimates:**
- With just PageSpeed API: ~400 SEO checks per day (free forever)
- With OpenAI ($5 credit): ~2,500 AI-enhanced analyses (one-time)
- Total cost after free credits: ~$0.002-0.005 per analysis

## 🌐 Custom Domain Setup (Cloudflare Pages)

Want to use your own domain instead of `*.pages.dev`? Follow these steps:

### Adding a Custom Domain

1. **Access Custom Domains Settings**
   - Go to your Cloudflare Dashboard
   - Navigate to **Workers & Pages**
   - Select your SEO Health Check project
   - Click the **"Custom domains"** tab

2. **Add Your Domain**
   - Click **"Set up a custom domain"** button
   - Enter your domain name (e.g., `seo.yourdomain.com` or `yourdomain.com`)
   - Click **"Continue"**

3. **Configure DNS (Option A: Domain on Cloudflare)**
   - If your domain is already on Cloudflare:
     - Cloudflare will automatically add the required DNS records
     - Click **"Activate domain"**
     - Domain will be active in a few minutes!

4. **Configure DNS (Option B: Domain on Another Provider)**
   - If your domain is with another DNS provider:
     - Copy the CNAME record provided by Cloudflare
     - Log in to your DNS provider's dashboard
     - Add a new CNAME record:
       - **Name/Host:** `@` (for root domain) or subdomain name (e.g., `seo`)
       - **Value/Points to:** Your Pages deployment URL (e.g., `your-project.pages.dev`)
       - **TTL:** 3600 (or auto)
     - Save the DNS changes
     - Return to Cloudflare and click **"Check DNS"**
     - Wait for DNS propagation (5 minutes to 48 hours, usually ~15 minutes)

5. **SSL Certificate**
   - Cloudflare automatically provisions SSL certificates
   - HTTPS will be enabled within 15-30 minutes
   - Force HTTPS is enabled by default

### Using a Subdomain (Recommended for Testing)

If you want to test before moving your main domain:
- Use a subdomain like `seo.yourdomain.com` or `check.yourdomain.com`
- This way your main website remains unchanged
- You can always add the root domain later

### Apex Domain vs Subdomain

**Apex Domain (yourdomain.com):**
- Cleaner, more professional URL
- May require special DNS configuration (CNAME flattening)
- Cloudflare handles this automatically

**Subdomain (seo.yourdomain.com):**
- Easier to set up
- Better for testing
- No special DNS requirements
- Can coexist with your main site

## 📊 Monitoring and Analytics

### Cloudflare Analytics (Built-in, Free)

1. **Access Analytics**
   - Go to your project in Cloudflare Dashboard
   - Click **"Analytics"** tab
   - View detailed metrics including:
     - **Page views** - Total visits to your site
     - **Requests** - API calls and page loads
     - **Data transfer** - Bandwidth usage
     - **Unique visitors** - Distinct users

2. **Real-time Monitoring**
   - Monitor live traffic and performance
   - See geographic distribution of visitors
   - Track response times and errors

### Function Logs and Debugging

1. **View Function Logs**
   - Navigate to **Functions** tab
   - Click **"Real-time logs"**
   - See live execution logs from your API functions
   - Debug errors and API call issues

2. **Deployment Logs**
   - Go to **Deployments** tab
   - Click on any deployment
   - View build logs and deployment status
   - Identify build or deployment failures

3. **Error Tracking**
   - Monitor 4xx and 5xx errors
   - Track API failures and timeouts
   - Set up alerts for critical issues (Pro plan feature)

### API Usage Monitoring

**Google PageSpeed Insights:**
- Monitor usage in [Google Cloud Console](https://console.cloud.google.com/)
- Navigate to **APIs & Services** > **Dashboard**
- View daily API quota usage
- Set up quota alerts to avoid hitting limits

**OpenAI API:**
- Check usage at [OpenAI Platform](https://platform.openai.com/account/usage)
- Monitor costs and token consumption
- Set monthly budget limits to control spending

### Setting Up Alerts (Optional)

For production deployments, consider:
- Cloudflare Notifications (Pro plan) for downtime alerts
- Google Cloud Monitoring for API quota alerts
- OpenAI usage alerts for cost control

## ⚠️ Important Notes

- **No fallback content** - This tool requires live API services
- **API key required** - PageSpeed analysis requires valid Google API key
- **CORS handled** - Functions eliminate CORS issues automatically
- **Rate limiting** - Respect API rate limits to avoid service interruption

## 🔧 Troubleshooting

### Common Deployment Issues

#### Build Fails During Deployment

**Problem:** Deployment fails with build errors

**Solutions:**
1. **Check build settings:**
   - Build command should be empty or `echo "No build required"`
   - Build output directory should be `/`
   - Root directory should be blank or `/`

2. **Review deployment logs:**
   - Go to **Deployments** tab
   - Click on the failed deployment
   - Check logs for specific error messages

3. **Verify repository structure:**
   - Ensure `index.html` is in the root directory
   - Confirm `functions/api/` directory exists with API files

#### Environment Variables Not Working

**Problem:** API calls fail with "API key not configured" error

**Solutions:**
1. **Verify variable names:**
   - Must match exactly: `PAGESPEED_API_KEY`, `OPENAI_API_KEY`, etc.
   - Check for typos and extra spaces

2. **Check variable scope:**
   - Ensure variables are set for "Production" environment
   - Add for "Preview" too if testing preview deployments

3. **Redeploy after adding variables:**
   - Adding variables doesn't automatically redeploy
   - Go to **Deployments** > **⋯** > **Retry deployment**

4. **Test variable accessibility:**
   - Check function logs for variable-related errors
   - Ensure functions are reading from `env` parameter

#### Functions Return 500 Errors

**Problem:** API endpoints return 500 Internal Server Error

**Solutions:**
1. **Check function logs:**
   - Enable real-time logs in Functions tab
   - Look for specific error messages

2. **Verify API keys:**
   - Test API keys independently
   - Use curl or Postman to test APIs directly:
     ```bash
     curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://example.com&key=YOUR_API_KEY"
     ```

3. **Review CORS headers:**
   - Ensure functions include proper CORS headers
   - Check that `Access-Control-Allow-Origin: *` is set

### API-Specific Issues

#### "PageSpeed Service Unavailable"

**Problem:** PageSpeed API calls fail

**Solutions:**
1. **Verify API key:**
   - Confirm key is valid in [Google Cloud Console](https://console.cloud.google.com/)
   - Ensure API is enabled for your project
   - Check API restrictions aren't blocking requests

2. **Check quota limits:**
   - Free tier: 400 queries/day
   - View usage in Cloud Console > APIs & Services > Dashboard
   - Reset occurs at midnight Pacific Time

3. **Test API directly:**
   ```bash
   curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://example.com&key=YOUR_KEY&strategy=desktop"
   ```

4. **API key restrictions:**
   - If you added HTTP referrer restrictions, ensure they include:
     - `*.pages.dev/*` for Cloudflare Pages
     - Your custom domain if applicable

#### "OpenAI API Error" or Rate Limits

**Problem:** ChatGPT API calls fail or hit rate limits

**Solutions:**
1. **Verify API key:**
   - Confirm key starts with `sk-` and is valid
   - Check at [OpenAI API Keys](https://platform.openai.com/api-keys)

2. **Check account status:**
   - Ensure billing is set up (required after free credits)
   - Verify you haven't exceeded spending limits
   - View usage at [OpenAI Usage](https://platform.openai.com/account/usage)

3. **Rate limiting:**
   - Free tier: 3 requests per minute (RPM) for GPT-3.5
   - Paid tier: Higher limits based on usage tier
   - Implement exponential backoff in your code

4. **Cost issues:**
   - Set monthly budget limits
   - Use GPT-3.5-turbo instead of GPT-4 for cost savings
   - Cache responses to reduce API calls

#### "Failed to Fetch Page Content"

**Problem:** Cannot retrieve target website content

**Solutions:**
1. **Target site blocking:**
   - Some websites block automated requests
   - Try with different websites to isolate issue
   - Cloudflare Functions should handle most CORS issues

2. **URL format:**
   - Ensure URL includes protocol: `https://example.com`
   - Check for typos or invalid URLs
   - Test with known-good URLs like `https://example.com`

3. **Timeout issues:**
   - Large websites may take longer to load
   - Function timeout is 30 seconds by default
   - Some sites may be temporarily unavailable

### DNS and Custom Domain Issues

#### Custom Domain Not Working

**Problem:** Custom domain shows error or doesn't load

**Solutions:**
1. **DNS propagation:**
   - Can take up to 48 hours (usually 15 minutes)
   - Check DNS propagation: [WhatsMyDNS.net](https://www.whatsmydns.net/)
   - Flush your local DNS cache

2. **Verify CNAME record:**
   - Should point to `your-project.pages.dev`
   - Check with: `nslookup your-domain.com`
   - Ensure no conflicting A or AAAA records

3. **SSL certificate pending:**
   - Wait 15-30 minutes for SSL provisioning
   - Check certificate status in Cloudflare dashboard
   - Try accessing with `http://` first (redirects to HTTPS when ready)

#### Mixed Content Warnings

**Problem:** Browser shows "not secure" warnings

**Solutions:**
1. **Force HTTPS:**
   - Enabled by default in Cloudflare Pages
   - Check SSL/TLS encryption mode in Cloudflare

2. **Update hardcoded URLs:**
   - Replace `http://` with `https://` in your code
   - Use protocol-relative URLs: `//example.com`

### Performance Issues

#### Slow Loading Times

**Problem:** Site or API calls are slow

**Solutions:**
1. **Enable caching:**
   - Cloudflare automatically caches static assets
   - Consider caching API responses

2. **Optimize API calls:**
   - Avoid making multiple simultaneous API requests
   - Implement request queuing
   - Cache PageSpeed results (valid for 24 hours)

3. **Check geographic location:**
   - Test from multiple locations
   - Cloudflare CDN should provide fast global access

#### High API Costs

**Problem:** OpenAI API costs are higher than expected

**Solutions:**
1. **Monitor token usage:**
   - Check [OpenAI Usage Dashboard](https://platform.openai.com/account/usage)
   - Review which endpoints consume most tokens

2. **Optimize prompts:**
   - Use shorter, more focused prompts
   - Avoid unnecessary API calls
   - Implement response caching

3. **Set spending limits:**
   - Configure hard limits in OpenAI dashboard
   - Set up email alerts for spending thresholds

### Getting Help

If you're still experiencing issues:

1. **Check logs first:**
   - Cloudflare Pages deployment logs
   - Function real-time logs
   - Browser console errors (F12)

2. **Test components individually:**
   - Test API keys with curl/Postman
   - Verify DNS with online tools
   - Check site works locally

3. **Community support:**
   - [Cloudflare Community](https://community.cloudflare.com/)
   - [GitHub Issues](https://github.com/kedster/SEO-Health-Check-Tool/issues)
   - Stack Overflow with tags: `cloudflare-pages`, `cloudflare-workers`

4. **Documentation:**
   - [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
   - [Google PageSpeed API Docs](https://developers.google.com/speed/docs/insights/v5/get-started)
   - [OpenAI API Docs](https://platform.openai.com/docs/api-reference)
## 🚀 Quick Reference Guide

### Cloudflare Pages Build Settings (Copy-Paste Ready)

```
Framework preset: None
Build command: (leave empty)
Build output directory: /
Root directory: (leave empty)
```

### Environment Variables Template

```
PAGESPEED_API_KEY=AIzaSy...
OPENAI_API_KEY=sk-...
GOOGLE_SEARCH_CONSOLE_CLIENT_ID=...
GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET=...
```

### Essential URLs

| Service | URL |
|---------|-----|
| Cloudflare Dashboard | https://dash.cloudflare.com/ |
| Google Cloud Console | https://console.cloud.google.com/ |
| OpenAI Platform | https://platform.openai.com/ |
| PageSpeed API Setup | https://console.cloud.google.com/apis/library/pagespeedonline.googleapis.com |
| OpenAI API Keys | https://platform.openai.com/api-keys |
| Google Search Console | https://search.google.com/search-console |

### Free Tier Limits Summary

| Service | Free Tier | Cost After Free Tier |
|---------|-----------|---------------------|
| Cloudflare Pages | 500 builds/month, unlimited bandwidth | Free forever |
| PageSpeed API | 400 queries/day | Pay-as-you-go (very affordable) |
| OpenAI API | $5 credit (new users) | $0.002/1K tokens (GPT-3.5) |
| Google Search Console | Unlimited | Free forever |
| W3C Validator | Unlimited (with fair use) | Free forever |
| SSL Labs | 25 assessments/day | Free forever |

### Deployment Checklist

- [ ] Fork repository to your GitHub account
- [ ] Create Cloudflare account
- [ ] Connect GitHub to Cloudflare Pages
- [ ] Configure build settings (leave empty)
- [ ] Get Google PageSpeed API key
- [ ] Add PAGESPEED_API_KEY environment variable
- [ ] Deploy site
- [ ] Test with example.com
- [ ] (Optional) Get OpenAI API key
- [ ] (Optional) Add OPENAI_API_KEY environment variable
- [ ] (Optional) Set up custom domain
- [ ] Monitor usage in respective dashboards

### Common Command Line Tests

**Test PageSpeed API:**
```bash
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://example.com&key=YOUR_API_KEY"
```

**Test OpenAI API:**
```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": "Hello"}]}'
```

**Check DNS:**
```bash
nslookup your-domain.com
# or
dig your-domain.com
```

**Flush DNS Cache:**
```bash
# Windows
ipconfig /flushdns

# macOS
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# Linux
sudo systemd-resolve --flush-caches
```

### Pro Tips for Success

1. **Start Simple**
   - Deploy with just PageSpeed API first
   - Add optional APIs later once working

2. **Monitor Costs**
   - Set up spending alerts in all paid APIs
   - Use free tiers as much as possible
   - Cache responses to reduce API calls

3. **Test Thoroughly**
   - Test with multiple websites
   - Check both HTTP and HTTPS sites
   - Verify all features work before sharing

4. **Stay Within Limits**
   - Track API usage daily
   - Implement rate limiting in your app
   - Use efficient API strategies

5. **Keep Keys Secret**
   - Never commit API keys to Git
   - Always use environment variables
   - Rotate keys if accidentally exposed

### Next Steps After Deployment

1. **Customize the Tool**
   - Add your branding
   - Customize colors and styles
   - Add additional SEO checks

2. **Monitor Performance**
   - Check Cloudflare Analytics weekly
   - Monitor API quotas
   - Track costs if using paid APIs

3. **Share and Iterate**
   - Share with colleagues or clients
   - Gather feedback
   - Make improvements based on usage

4. **Consider Enhancements**
   - Add user authentication
   - Implement result caching
   - Create detailed PDF reports
   - Add historical tracking

## 📚 Additional Resources

### Learning Resources
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Functions Guide](https://developers.cloudflare.com/pages/functions/)
- [Google PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started)
- [OpenAI API Documentation](https://platform.openai.com/docs/)
- [SEO Best Practices by Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

### Community and Support
- [Cloudflare Community Forum](https://community.cloudflare.com/)
- [Cloudflare Discord](https://discord.com/invite/cloudflare)
- [OpenAI Community Forum](https://community.openai.com/)
- [GitHub Repository Issues](https://github.com/kedster/SEO-Health-Check-Tool/issues)

### Tools for Testing
- [WhatsMyDNS.net](https://www.whatsmydns.net/) - Check DNS propagation
- [SSL Labs](https://www.ssllabs.com/ssltest/) - Test SSL configuration
- [Google PageSpeed Insights](https://pagespeed.web.dev/) - Test your site
- [GTmetrix](https://gtmetrix.com/) - Performance testing
- [Cloudflare Speed Test](https://speed.cloudflare.com/) - Network speed test

---

**Made with ❤️ for the SEO community**

*Need help? [Open an issue](https://github.com/kedster/SEO-Health-Check-Tool/issues) on GitHub!*
