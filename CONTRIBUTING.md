# Contributing to SEO Health Check Tool

Thank you for your interest in contributing to the SEO Health Check Tool! This guide will help you get started with development and contributing to the project.

## 🚀 Quick Start for Contributors

### Prerequisites for Development
- **Node.js** (v14 or higher) - for running tests
- **Git** - for version control
- **Modern web browser** - for testing
- **Code editor** (VS Code recommended with Live Server extension)

### Development Setup

1. **Fork and Clone**
   ```bash
   # Fork the repository on GitHub first, then:
   git clone https://github.com/yourusername/SEO-Health-Check-Tool.git
   cd SEO-Health-Check-Tool
   
   # Add upstream remote
   git remote add upstream https://github.com/kedster/SEO-Health-Check-Tool.git
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   # Option 1: Using Python
   python -m http.server 8000
   
   # Option 2: Using Node.js serve
   npx serve . -p 8000
   
   # Option 3: Using VS Code Live Server extension
   # Right-click index.html -> "Open with Live Server"
   ```

4. **Open in Browser**
   Navigate to `http://localhost:8000`

## 🧪 Testing Guidelines

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run with coverage report
npm run test:coverage
```

### Test Structure
- `tests/__tests__/analyzeHTML.test.js` - Core SEO analysis functions
- `tests/__tests__/utilityFunctions.test.js` - URL validation and scoring
- `tests/__tests__/integration.test.js` - Full workflow testing

### Writing New Tests
When adding new SEO checks or features:

1. **Add unit tests** for new functions:
   ```javascript
   // Example test structure
   describe('New SEO Check', () => {
     test('should detect missing feature', () => {
       const html = '<html><body></body></html>';
       const issues = analyzeHTML(html, 'https://example.com');
       const featureIssue = issues.find(issue => 
         issue.title.includes('Missing Feature')
       );
       expect(featureIssue).toBeDefined();
       expect(featureIssue.type).toBe('critical');
     });
   });
   ```

2. **Test edge cases**:
   - Empty HTML
   - Malformed HTML
   - Very large pages
   - Pages with unusual structure

3. **Maintain high coverage** (aim for >90%)

## 🔧 Code Style Guidelines

### JavaScript (ES6+)
```javascript
// Use descriptive function names
function analyzeMetaDescription(doc) {
  const metaDesc = doc.querySelector('meta[name="description"]');
  
  if (!metaDesc) {
    return {
      type: 'critical',
      title: '❌ Missing Meta Description',
      description: 'No meta description found.',
      guidance: 'Add a unique meta description (150-160 characters).'
    };
  }
  
  // Continue with validation...
}

// Use const/let appropriately
const issues = [];
let score = 100;

// Use template literals for strings
const message = `Found ${count} issues in ${url}`;
```

### HTML Structure
```html
<!-- Use semantic HTML5 elements -->
<main class="container">
  <section class="results">
    <header class="score-header">
      <h2>Analysis Results</h2>
    </header>
  </section>
</main>
```

### CSS
```css
/* Use modern CSS features */
.card {
  display: grid;
  gap: 1rem;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Use custom properties for consistency */
:root {
  --primary-color: #667eea;
  --warning-color: #f39c12;
  --error-color: #e74c3c;
}
```

## 🆕 Adding New SEO Checks

To add a new SEO analysis feature:

1. **Add the check logic** to `src/seoAnalyzer.js`:
   ```javascript
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
   ```

2. **Integrate into main analysis** in `analyzeHTML()`:
   ```javascript
   // Add to the main analyzeHTML function
   issues.push(...checkOpenGraphTags(doc));
   ```

3. **Add comprehensive tests**:
   ```javascript
   describe('Open Graph Tags', () => {
     test('should detect missing og:title', () => {
       const html = '<html><head><title>Test</title></head></html>';
       const issues = analyzeHTML(html, 'https://example.com');
       const ogIssue = issues.find(issue => 
         issue.title.includes('Open Graph Title')
       );
       expect(ogIssue).toBeDefined();
     });
     
     test('should pass with valid og:title', () => {
       const html = '<html><head><meta property="og:title" content="Test Title"></head></html>';
       const issues = analyzeHTML(html, 'https://example.com');
       const ogIssue = issues.find(issue => 
         issue.title.includes('Open Graph Title')
       );
       expect(ogIssue).toBeUndefined();
     });
   });
   ```

4. **Update documentation** to include the new check

## 🐛 Bug Reporting

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce** the problem
3. **Expected vs actual behavior**
4. **Browser and version** used
5. **URL being analyzed** (if relevant)
6. **Console errors** (if any)

### Example Bug Report
```markdown
**Bug Description**
Title tag analysis incorrectly flags valid titles as too long.

**Steps to Reproduce**
1. Analyze URL: https://example.com
2. Page has title: "Valid SEO Title - 55 Characters"
3. Tool reports "Title Tag Length Issue"

**Expected Behavior**
Should not flag titles between 50-60 characters.

**Actual Behavior**
Flags 55-character title as too long.

**Browser**: Chrome 91.0.4472.124
**Console Errors**: None
```

## 📋 Pull Request Process

### Before Submitting
1. **Create a feature branch**:
   ```bash
   git checkout -b feature/description-of-change
   ```

2. **Make focused changes**:
   - One feature/fix per PR
   - Keep changes minimal and focused
   - Follow existing code patterns

3. **Test thoroughly**:
   ```bash
   npm test
   # Test in browser with various URLs
   ```

4. **Update documentation** if needed

### PR Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] All tests pass
- [ ] Tested in browser
- [ ] Tested with multiple URLs
- [ ] Added new tests (if applicable)

## Screenshots
Include screenshots for UI changes.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

## 🚨 Common Development Issues

### CORS Errors During Testing
```javascript
// The tool includes demo content fallback for testing
// When external fetch fails, it uses sample HTML for analysis
console.warn('External fetch failed, using demo content for testing');
```

**Solution**: This is normal for local development. The tool gracefully falls back to demo content.

### Tests Failing
```bash
# Clear jest cache
npx jest --clearCache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Live Server Not Working
```bash
# Alternative servers
python3 -m http.server 8000
# or
npx live-server --port=8000
# or
php -S localhost:8000
```

## 🎯 Development Workflow

### Daily Development
1. **Pull latest changes**:
   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Create feature branch**:
   ```bash
   git checkout -b feature/new-seo-check
   ```

3. **Develop with tests**:
   ```bash
   # Terminal 1: Run tests in watch mode
   npm run test:watch
   
   # Terminal 2: Run development server
   python -m http.server 8000
   ```

4. **Commit and push**:
   ```bash
   git add .
   git commit -m "Add: New meta keyword analysis
   
   - Detects missing meta keywords
   - Provides guidance for keyword optimization
   - Includes comprehensive tests"
   
   git push origin feature/new-seo-check
   ```

### Code Review Process
1. **Self-review** your changes
2. **Test on multiple browsers** when possible
3. **Check that all tests pass**
4. **Submit PR** with clear description
5. **Respond to feedback** promptly
6. **Update branch** if requested

## 🤝 Community Guidelines

- **Be respectful** and inclusive
- **Ask questions** if you're unsure
- **Help other contributors** when possible
- **Follow** the code of conduct
- **Provide constructive feedback** in reviews

## 📞 Getting Help

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and general discussion
- **Code Review** - Ask for help in PR comments

## 🏆 Recognition

Contributors are recognized in:
- GitHub contributors list
- Release notes for major contributions
- Special mentions for significant improvements

---

**Happy Contributing! 🚀**

Every contribution, no matter how small, helps make this tool better for the entire SEO community.