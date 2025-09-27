# 🚀 Deployment Guide

This SEO Health Check Tool can be deployed using multiple methods. The recommended approach for production is **Cloudflare Pages** for best performance and reliability.

## 🌟 Recommended: Cloudflare Pages (with Functions)

Cloudflare Pages provides excellent performance, global CDN, and serverless functions to handle API calls without CORS issues.

### Steps:

1. **Fork/Clone the repository** to your GitHub account

2. **Connect to Cloudflare Pages:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to Pages > Create a project
   - Connect your GitHub repository
   - Select this repository

3. **Configure Build Settings:**
   - Build command: `echo "No build required"`
   - Build output directory: `/` (root)
   - Root directory: `/` (leave blank)

4. **Set Environment Variables:**
   - Go to Pages > Settings > Environment variables
   - Add `PAGESPEED_API_KEY` with your Google PageSpeed Insights API key
   - Get API key from [Google Cloud Console](https://console.cloud.google.com/apis/library/pagespeedonline.googleapis.com)

5. **Deploy:**
   - Click "Save and Deploy"
   - Your site will be available at `https://your-project.pages.dev`

### Features with Cloudflare Pages:
- ✅ **No CORS issues** - Functions handle API calls server-side
- ✅ **Global CDN** - Fast loading worldwide
- ✅ **Automatic HTTPS** - SSL certificates included
- ✅ **Environment variables** - Secure API key storage
- ✅ **Custom domains** - Use your own domain name

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

### Google PageSpeed Insights API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the PageSpeed Insights API
4. Create credentials (API key)
5. Add the API key to your environment variables

### Free Quota Limits
- **400 queries per day** for free tier
- Higher quotas available with billing enabled

## 🌐 Custom Domain Setup (Cloudflare Pages)

1. **Add custom domain:**
   - Go to Pages > Custom domains
   - Add your domain name
   - Follow DNS setup instructions

2. **Configure DNS:**
   - Add CNAME record pointing to your Pages domain
   - Or use Cloudflare as your DNS provider for automatic setup

## 📊 Monitoring and Analytics

### Cloudflare Analytics
- Built-in analytics available in Cloudflare dashboard
- Monitor page views, bandwidth, and performance

### Function Logs
- View function execution logs in Cloudflare dashboard
- Monitor API usage and errors

## ⚠️ Important Notes

- **No fallback content** - This tool requires live API services
- **API key required** - PageSpeed analysis requires valid Google API key
- **CORS handled** - Functions eliminate CORS issues automatically
- **Rate limiting** - Respect API rate limits to avoid service interruption

## 🔧 Troubleshooting

### Common Issues:

**"PageSpeed Service Unavailable"**
- Check API key configuration
- Verify API quota not exceeded
- Ensure API is enabled in Google Cloud Console

**"Failed to fetch page content"**
- Target website may block requests
- Check if URL is accessible
- Some websites have strict CORS policies

**Functions not working**
- Verify functions are deployed correctly
- Check environment variables are set
- Review function logs in Cloudflare dashboard