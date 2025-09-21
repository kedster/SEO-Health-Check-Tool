# SEO Health Check Tool - Examples

This directory contains example HTML files that demonstrate different SEO scenarios for testing and development purposes.

## Example Files

### 1. perfect-seo.html
A comprehensive example showing **optimal SEO implementation**:
- ✅ Proper title tag (50-60 characters)
- ✅ Optimized meta description (150-160 characters) 
- ✅ Single H1 tag with proper heading hierarchy
- ✅ All images have descriptive alt text
- ✅ Canonical URL specified
- ✅ Mobile viewport configured
- ✅ Structured data (JSON-LD) included
- ✅ Open Graph and Twitter Card tags
- ✅ Semantic HTML structure

**Expected Results**: High SEO score (90-100) with minimal or no issues.

### 2. seo-issues.html
A test file with **common SEO problems**:
- ❌ Missing title tag
- ❌ Missing meta description
- ❌ Multiple H1 tags
- ❌ Images without alt text
- ❌ No canonical URL
- ❌ Missing structured data
- ❌ No Open Graph tags

**Expected Results**: Low SEO score with multiple critical and warning issues detected.

## Using the Examples

### For Development Testing
1. Start a local server in the project root:
   ```bash
   python -m http.server 8000
   ```

2. Use the example files as test URLs:
   - Perfect SEO: `http://localhost:8000/examples/perfect-seo.html`
   - SEO Issues: `http://localhost:8000/examples/seo-issues.html`

### For Understanding SEO Checks
Compare the source code of both files to understand what the SEO Health Check Tool looks for:

```bash
# View the perfect example
cat examples/perfect-seo.html

# View the problematic example  
cat examples/seo-issues.html
```

## Adding Your Own Examples

When contributing new SEO checks, consider adding example files that demonstrate:

1. **Positive examples** - How to implement the feature correctly
2. **Negative examples** - What the tool should detect as issues
3. **Edge cases** - Unusual but valid implementations

### Example File Naming Convention
- `feature-name-good.html` - Demonstrates correct implementation
- `feature-name-bad.html` - Contains issues to be detected
- `feature-name-edge-case.html` - Tests boundary conditions

## Testing Your Changes

Use these examples to verify your SEO analysis modifications:

1. **Baseline test**: Analyze the perfect example to ensure it scores highly
2. **Issue detection**: Analyze the issues example to verify problems are caught
3. **Regression test**: Ensure existing functionality still works after changes

This helps maintain the tool's accuracy and reliability across different SEO scenarios.