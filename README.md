# 🔍 SEO Health Check Tool

A comprehensive web-based SEO analysis tool that helps website owners and developers identify and fix SEO issues to improve search engine performance. This tool provides real-time analysis with actionable insights and a user-friendly interface.

![SEO Health Check Tool](https://img.shields.io/badge/SEO-Health%20Check-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![CSS3](https://img.shields.io/badge/CSS3-Modern-blue)
![HTML5](https://img.shields.io/badge/HTML5-Semantic-orange)

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
- **Google PageSpeed Insights API** integration for real-time performance metrics
- **Load Time Analysis** - Measures and reports page loading speed
- **Page Size Monitoring** - Tracks total page weight
- **Performance Score** - Combined SEO and performance scoring

### User Experience
- **Real-time Analysis** - Instant feedback on SEO issues
- **Issue Categorization** - Critical and warning level classifications
- **Actionable Guidance** - Specific recommendations for each issue
- **Responsive Design** - Modern gradient UI that works on all devices
- **API Configuration** - Easy setup for PageSpeed Insights integration

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- (Optional) Google PageSpeed Insights API key for performance analysis
- (Optional) CORS proxy for cross-origin requests

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/kedster/SEO-Health-Check-Tool.git
   cd SEO-Health-Check-Tool
   ```

2. Open `index.html` in your web browser or serve it using a local web server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. Navigate to `http://localhost:8000` in your browser

### API Setup (Optional but Recommended)
1. Get a Google PageSpeed Insights API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the PageSpeed Insights API for your project
3. Enter your API key in the tool's configuration section
4. Configure a CORS proxy URL if needed (default provided)

## 💻 Usage

1. **Configure APIs** (optional): Enter your PageSpeed Insights API key and CORS proxy URL
2. **Enter URL**: Input the website URL you want to analyze
3. **Start Analysis**: Click "Analyze Site" to begin the SEO health check
4. **Review Results**: Examine the overall score and detailed issue breakdown
5. **Follow Guidance**: Implement the provided recommendations to improve SEO

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
└── README.md          # Project documentation
```

### Key Components
- **`startSEOCheck()`** - Main entry point for analysis
- **`analyzeHTML()`** - HTML structure and content analysis
- **`analyzePageSpeed()`** - Performance metrics via PageSpeed API
- **`checkLinks()`** - Broken link detection
- **`displayResults()`** - Results rendering and UI updates

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

## 🤝 Contributing

Contributions are welcome! Here are ways you can help:

1. **Report Issues** - Found a bug or have a feature request? Open an issue
2. **Submit PRs** - Fix bugs, add features, or improve documentation
3. **Suggest Improvements** - Ideas for new SEO checks or UI enhancements
4. **Share Feedback** - Let us know how the tool works for you

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- [Live Demo](https://kedster.github.io/SEO-Health-Check-Tool/) *(if hosted on GitHub Pages)*
- [Issues](https://github.com/kedster/SEO-Health-Check-Tool/issues)
- [Google PageSpeed Insights API Documentation](https://developers.google.com/speed/docs/insights/v5/get-started)

## 📊 Project Status

**Active Development** - This project is actively maintained and improved. Check the [issues](https://github.com/kedster/SEO-Health-Check-Tool/issues) page for current development priorities and planned features.

---

**Made with ❤️ for the SEO community**