# 🔍 SEO Health Check Tool

A comprehensive, open-source web-based SEO analysis tool that empowers website owners, developers, and digital marketers to identify and resolve SEO issues efficiently. Built with modern web technologies, this tool provides instant, actionable insights to improve your website's search engine performance and visibility.

## 🌟 Project Overview

The SEO Health Check Tool is designed to democratize SEO analysis by providing a free, easy-to-use interface that performs comprehensive website audits without requiring technical expertise. Whether you're optimizing a personal blog, corporate website, or e-commerce platform, this tool delivers the insights you need to improve your search rankings.

### Why Choose This Tool?

- **🚀 Zero Installation Required** - Runs directly in your browser or with simple Node.js backend
- **🔒 Privacy-First & Secure** - API keys stored securely on backend, no sensitive data exposed
- **💰 Cost-Effective** - Free alternative to expensive SEO audit tools
- **🎯 Actionable Results** - Specific recommendations, not just problems
- **📱 Mobile-Friendly** - Responsive design works on all devices
- **🔧 Extensible** - Open-source and customizable

![SEO Health Check Tool](https://img.shields.io/badge/SEO-Health%20Check-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![CSS3](https://img.shields.io/badge/CSS3-Modern-blue)
![HTML5](https://img.shields.io/badge/HTML5-Semantic-orange)
![License](https://img.shields.io/badge/License-MIT-green)
![Maintenance](https://img.shields.io/badge/Maintained-Yes-brightgreen)

## ✨ Features

### Core SEO Analysis
- **Title Tag Optimization** - Validates presence and optimal length (50-60 characters)
- **Meta Description Check** - Ensures proper meta descriptions (150-160 characters)
- **Heading Structure** - Analyzes H1 tags and heading hierarchy
- **Image Optimization** - Detects missing alt text attributes
- **Canonical URL Validation** - Prevents duplicate content issues
- **Mobile Responsiveness** - Checks viewport meta tag configuration
- **Structured Data Detection** - Identifies Schema.org markup

### Performance Integration
- **Secure Backend API** - API keys safely stored server-side, never exposed to frontend
- **Google PageSpeed Insights API** integration for real-time performance metrics
- **Load Time Analysis** - Measures and reports page loading speed
- **Page Size Monitoring** - Tracks total page weight
- **Performance Score** - Combined SEO and performance scoring

### User Experience
- **Real-time Analysis** - Instant feedback on SEO issues
- **Issue Categorization** - Critical and warning level classifications
- **Actionable Guidance** - Specific recommendations for each issue
- **Responsive Design** - Modern gradient UI that works on all devices
- **Secure Configuration** - No API keys exposed in frontend

## 🚀 Getting Started

### 🎮 Live Demo

**Try it now:** [SEO Health Check Tool Demo](https://kedster.github.io/SEO-Health-Check-Tool/)

![SEO Health Check Interface](https://github.com/user-attachments/assets/0d6f52cb-8012-45b1-ba69-25e518877573)

Test the tool with these example URLs:
- `https://example.com` - Basic website structure
- `https://github.com` - Complex modern website
- `https://developer.mozilla.org` - Technical documentation site

### 📊 Sample Results

![SEO Analysis Results](https://github.com/user-attachments/assets/f7cc3481-622c-41ec-8774-62a7ba1772d2)

*Example analysis showing SEO score of 84/100 with 2 issues found: Multiple H1 tags and missing image alt text*

### Prerequisites

- **Modern web browser** with JavaScript enabled
  - Chrome 60+ / Firefox 55+ / Safari 12+ / Edge 79+
- **Internet connection** for fetching web pages and API calls
- **Optional**: [Google PageSpeed Insights API key](https://console.cloud.google.com/) for enhanced performance analysis
- **Optional**: CORS proxy for analyzing restricted websites

### Installation Options

#### Option 1: Run with Backend (Recommended)
1. **Download the latest release** or clone the repository:
   ```bash
   git clone https://github.com/kedster/SEO-Health-Check-Tool.git
   cd SEO-Health-Check-Tool
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API key (optional):**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env and add your PageSpeed API key
   # PAGESPEED_API_KEY=your_actual_api_key_here
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Open in browser**: Navigate to `http://localhost:3000`

#### Option 2: Static Frontend Only
If you prefer to run without the backend (limited functionality):

1. **Start a local web server** (required for proper functionality):
   
   **Using Python 3:**
   ```bash
   python -m http.server 8000
   ```
   
   **Using Node.js:**
   ```bash
   # Install serve globally (one time)
   npm install -g serve
   
   # Run the server
   serve . -p 8000
   ```

2. **Open in browser**: Navigate to `http://localhost:8000`

#### Option 3: GitHub Pages (Hosted Version)
Simply visit the [live demo](https://kedster.github.io/SEO-Health-Check-Tool/) - no installation required!

### API Setup (Handled by Backend)
The application now includes a secure backend service that handles API keys:

1. Get a Google PageSpeed Insights API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the PageSpeed Insights API for your project  
3. Set the `PAGESPEED_API_KEY` environment variable or update `.env` file
4. The backend securely handles all API requests without exposing keys to the frontend

## 💻 Usage

### Quick Start Guide

1. **Configure APIs** (optional but recommended):
   - Enter your Google PageSpeed Insights API key for enhanced performance analysis
   - Configure CORS proxy URL if needed (default is provided)
   - These settings are saved locally in your browser

2. **Enter Website URL**:
   ```
   Example URLs:
   • https://example.com
   • https://www.yourwebsite.com
   • https://blog.company.com/specific-page
   ```

3. **Start Analysis**:
   - Click "Analyze Site" to begin comprehensive SEO audit
   - The tool will fetch and analyze your page content
   - Wait for the analysis to complete (typically 10-30 seconds)

4. **Review Results**:
   - **Overall Score**: 0-100 rating based on SEO health
   - **Critical Issues**: Must-fix problems affecting search visibility
   - **Warnings**: Recommended improvements for better optimization
   - **Performance Metrics**: Load time, page size, and speed insights

5. **Implement Recommendations**:
   - Each issue includes specific guidance on how to fix it
   - Priority is indicated by issue type (Critical vs Warning)
   - Use the actionable advice to improve your website's SEO

### Code Examples for Common SEO Fixes

#### Title Tag Optimization
```html
<!-- ❌ Poor title -->
<title>Home</title>

<!-- ✅ Optimized title (50-60 characters) -->
<title>SEO Health Check Tool - Free Website Analysis & Optimization</title>
```

#### Meta Description
```html
<!-- ❌ Missing meta description -->
<head>
  <title>My Website</title>
</head>

<!-- ✅ Proper meta description (150-160 characters) -->
<head>
  <title>My Website</title>
  <meta name="description" content="Comprehensive SEO analysis tool that helps identify and fix website optimization issues. Get actionable insights to improve your search rankings instantly.">
</head>
```

#### Heading Structure
```html
<!-- ❌ Multiple H1 tags -->
<h1>Welcome</h1>
<h1>About Us</h1>

<!-- ✅ Proper heading hierarchy -->
<h1>Welcome to Our Website</h1>
<h2>About Us</h2>
<h3>Our Mission</h3>
```

#### Image Alt Text
```html
<!-- ❌ Missing alt text -->
<img src="product.jpg">

<!-- ✅ Descriptive alt text -->
<img src="product.jpg" alt="Blue wireless headphones with noise cancellation feature">
```

### Example Analysis Results

After analyzing a website, you might see results like:

**Critical Issues:**
- ❌ Missing Title Tag → Add a unique 50-60 character title
- ❌ No Meta Description → Create compelling 150-160 character description

**Warnings:**
- ⚠️ Multiple H1 Tags → Use only one H1 per page
- ⚠️ Images Missing Alt Text → Add descriptive alt attributes

**Performance Stats:**
- Load Time: 2.3s
- Page Size: 1.2 MB
- SEO Score: 78/100

## 🔧 Technical Details

### Architecture
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **APIs**: Google PageSpeed Insights API v5
- **Parsing**: DOM Parser for HTML analysis
- **Styling**: Modern CSS with gradients and flexbox/grid layouts

### File Structure
```
├── index.html          # Main application interface
├── scripts.js          # Core analysis logic and API integrations
├── styles.css          # Modern responsive styling
├── src/
│   └── seoAnalyzer.js  # Modular SEO analysis functions
├── tests/              # Jest test suite
└── README.md          # Project documentation
```

### Key Components
- **`startSEOCheck()`** - Main entry point for analysis
- **`analyzeHTML(html, url)`** - HTML structure and content analysis
- **`analyzePageSpeed(url, apiKey)`** - Performance metrics via PageSpeed API
- **`checkLinks(doc, baseUrl)`** - Broken link detection
- **`displayResults(data)`** - Results rendering and UI updates

### Adding New SEO Checks

To extend the tool with new SEO analysis features:

```javascript
// 1. Add check function to src/seoAnalyzer.js
function checkOpenGraphTags(doc) {
  const issues = [];
  const ogTitle = doc.querySelector('meta[property="og:title"]');
  
  if (!ogTitle) {
    issues.push({
      type: 'warning',
      title: '📱 Missing Open Graph Title',
      description: 'No og:title meta tag found.',
      guidance: 'Add <meta property="og:title" content="Your Title"> for better social media sharing.'
    });
  }
  
  return issues;
}

// 2. Integrate into analyzeHTML function
function analyzeHTML(html, url) {
  // ... existing checks
  issues.push(...checkOpenGraphTags(doc));
  return issues;
}
```

## 🎯 SEO Checks Performed

| Check Type | Details | Impact |
|------------|---------|---------|
| Title Tags | Length, presence, uniqueness | Critical |
| Meta Descriptions | Length, presence, relevance | Critical |
| H1 Headers | Single H1, proper hierarchy | Critical |
| Image Alt Text | Accessibility and SEO optimization | Warning |
| Canonical URLs | Duplicate content prevention | Warning |
| Viewport Meta | Mobile responsiveness | Warning |
| Structured Data | Schema.org markup detection | Warning |
| Page Speed | Load time and performance metrics | Variable |
| Broken Links | Link integrity validation | Variable |

## 🔧 Troubleshooting

### Common Issues

**"CORS Error" when analyzing websites:**
```
Error: Failed to fetch
Access to fetch at 'https://example.com' from origin 'http://localhost:8000' has been blocked by CORS policy
```
- **Solution**: Use the provided CORS proxy (default: `https://api.allorigins.win/raw?url=`)
- **Alternative**: Run the tool on a local server (not file:// protocol)
- **Note**: Some websites block cross-origin requests for security

**"API Key Invalid" for PageSpeed Insights:**
- **Check**: Ensure your API key is correctly copied (format: `AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw`)
- **Verify**: API is enabled in [Google Cloud Console](https://console.cloud.google.com/apis/library/pagespeedonline.googleapis.com)
- **Quota**: Make sure you haven't exceeded daily API limits (400 queries/day free)

**Tool not loading or JavaScript errors:**
- **Browser**: Use a modern browser (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- **JavaScript**: Ensure JavaScript is enabled
- **Console**: Check browser developer console (F12) for error messages

**Analysis takes too long or times out:**
- **Network**: Check your internet connection
- **Website**: Target site might be slow or unresponsive
- **Retry**: Try analyzing the same URL again
- **Test**: Use `https://example.com` to verify tool functionality

### Development Setup

**For Contributors:**
```bash
# 1. Clone the repository
git clone https://github.com/kedster/SEO-Health-Check-Tool.git
cd SEO-Health-Check-Tool

# 2. Install test dependencies
npm install

# 3. Run tests
npm test

# 4. Start development server
python -m http.server 8000
# or
npx serve . -p 8000

# 5. Open browser
# Navigate to http://localhost:8000
```

**Running Tests:**
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Performance Tips

- **Use HTTPS URLs** for better compatibility
- **Avoid redirects** in target URLs when possible
- **Test smaller pages first** to verify tool functionality
- **Check browser console** for detailed error information

## ❓ FAQ

### General Questions

**Q: Is this tool free to use?**
A: Yes, completely free and open-source under MIT license.

**Q: Do I need to install anything?**
A: No, it runs entirely in your web browser.

**Q: Is my data secure?**
A: Yes, all analysis happens client-side. No data is sent to external servers except for the PageSpeed API (optional).

### Technical Questions

**Q: Can I analyze localhost websites?**
A: Yes, but you need to run the tool on a local server, not directly from files.

**Q: Does it work with password-protected sites?**
A: No, it can only analyze publicly accessible websites.

**Q: Can I customize the SEO checks?**
A: Yes, the code is open-source and easily customizable.

**Q: What browsers are supported?**
A: Modern browsers supporting ES6+: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+

### API Questions

**Q: Do I need a PageSpeed Insights API key?**
A: No, it's optional. The tool works without it but provides enhanced performance metrics with the API.

**Q: Is the PageSpeed Insights API free?**
A: Yes, Google provides free quota for personal use. Check current limits on Google Cloud Console.

## 🤝 Contributing

We welcome contributions from developers of all skill levels! This project thrives on community input and collaboration.

### Ways to Contribute

1. **🐛 Report Issues** - Found a bug or have a feature request? [Open an issue](https://github.com/kedster/SEO-Health-Check-Tool/issues)
2. **🔧 Submit Pull Requests** - Fix bugs, add features, or improve documentation
3. **💡 Suggest Improvements** - Ideas for new SEO checks or UI enhancements
4. **📢 Share Feedback** - Let us know how the tool works for you
5. **📚 Improve Documentation** - Help make the project more accessible
6. **🧪 Testing** - Help test new features and report compatibility issues

### Development Guidelines

#### Getting Started
```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork locally
git clone https://github.com/yourusername/SEO-Health-Check-Tool.git
cd SEO-Health-Check-Tool

# 3. Create a feature branch
git checkout -b feature/amazing-feature

# 4. Install dependencies and start development
npm install
python -m http.server 8000
```

#### Code Style
- Use **ES6+** JavaScript features
- Follow **semantic HTML5** structure
- Use **modern CSS** (flexbox/grid, custom properties)
- Maintain **consistent indentation** (2 spaces)
- Add **descriptive comments** for complex logic
- Use **meaningful variable names**

#### Adding New SEO Checks
```javascript
// Example: Adding a meta keywords check
function checkMetaKeywords(doc) {
  const issues = [];
  const metaKeywords = doc.querySelector('meta[name="keywords"]');
  
  if (!metaKeywords) {
    issues.push({
      type: 'warning',
      title: '🏷️ Missing Meta Keywords',
      description: 'No meta keywords found.',
      guidance: 'Add relevant keywords: <meta name="keywords" content="seo, website, analysis">'
    });
  }
  
  return issues;
}

// Add to analyzeHTML function
issues.push(...checkMetaKeywords(doc));
```

#### Testing Your Changes
```bash
# Run unit tests
npm test

# Test in browser
# 1. Start server: python -m http.server 8000
# 2. Test URLs: https://example.com, https://github.com
# 3. Check console for errors
```

#### Submitting Changes
```bash
# 1. Test thoroughly
npm test

# 2. Commit with clear message
git add .
git commit -m "Add: Meta keywords SEO check

- Detects missing meta keywords tag
- Provides guidance for keyword optimization
- Includes unit tests for validation"

# 3. Push and create PR
git push origin feature/amazing-feature
```

### Pull Request Guidelines
- **One feature per PR** - Keep changes focused
- **Update documentation** if needed
- **Test on multiple browsers** when possible
- **Follow existing code patterns**
- **Be responsive to feedback**

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What this means:
- ✅ **Free to use** for personal and commercial projects
- ✅ **Modify and distribute** as needed
- ✅ **No warranty** - use at your own risk
- ✅ **Attribution appreciated** but not required

## 🚀 Roadmap

### Upcoming Features
- [ ] **Accessibility Audit** - WCAG compliance checking
- [ ] **Social Media Meta Tags** - Open Graph and Twitter Card validation
- [ ] **JSON-LD Schema Detection** - Structured data analysis
- [ ] **Lighthouse Integration** - Full Google Lighthouse audit
- [ ] **Export Reports** - PDF and JSON export functionality
- [ ] **Bulk URL Analysis** - Analyze multiple pages at once
- [ ] **Historical Tracking** - Save and compare analysis results over time

### Long-term Goals
- [ ] **Browser Extension** - Chrome/Firefox extension version
- [ ] **API Endpoint** - Programmatic access to SEO analysis
- [ ] **WordPress Plugin** - Direct integration with WordPress sites
- [ ] **Mobile App** - Native mobile applications
- [ ] **Advanced Analytics** - Competitive analysis features

*Want to contribute to any of these features? Check out our [contributing guidelines](#-contributing)!*

## 🔗 Links & Resources

### Tool Links
- 🌐 **[Live Demo](https://kedster.github.io/SEO-Health-Check-Tool/)** - Try the tool online
- 🐛 **[Report Issues](https://github.com/kedster/SEO-Health-Check-Tool/issues)** - Bug reports and feature requests
- 🔀 **[Pull Requests](https://github.com/kedster/SEO-Health-Check-Tool/pulls)** - Contribute to the project
- 📦 **[Releases](https://github.com/kedster/SEO-Health-Check-Tool/releases)** - Download stable versions

### SEO Resources
- 📖 **[Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)**
- 🚀 **[PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started)**
- 🎯 **[Search Console](https://search.google.com/search-console)** - Google's official SEO tool
- 📊 **[Lighthouse](https://developers.google.com/web/tools/lighthouse)** - Web performance auditing

### Technical Documentation
- 🔧 **[MDN Web Docs](https://developer.mozilla.org/)** - HTML, CSS, JavaScript reference
- 🌐 **[Schema.org](https://schema.org/)** - Structured data vocabulary
- ♿ **[WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)** - Web accessibility standards

## 📊 Project Status

🟢 **Active Development** - This project is actively maintained and continuously improved.

### Current Status
- **Latest Version**: Check [releases](https://github.com/kedster/SEO-Health-Check-Tool/releases)
- **Issues**: ![GitHub issues](https://img.shields.io/github/issues/kedster/SEO-Health-Check-Tool)
- **Pull Requests**: ![GitHub pull requests](https://img.shields.io/github/issues-pr/kedster/SEO-Health-Check-Tool)
- **Contributors**: ![GitHub contributors](https://img.shields.io/github/contributors/kedster/SEO-Health-Check-Tool)

### Support
- 🐛 **Bug Reports**: Use GitHub Issues for bug reports
- 💡 **Feature Requests**: Suggest new features via GitHub Issues
- ❓ **Questions**: Check the [FAQ section](#-faq) first
- 💬 **Discussions**: Engage in project discussions

---

**Made with ❤️ for the SEO community**

*Help us improve by starring ⭐ the repository and sharing with others!*