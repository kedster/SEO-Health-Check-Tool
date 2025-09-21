/**
 * Unit tests for utility functions in the SEO Health Check Tool
 */

// Mock fetch function for URL fetching tests
global.fetch = jest.fn();

describe('URL Processing Functions', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('URL Validation', () => {
    test('should handle various URL formats', () => {
      const validUrls = [
        'https://example.com',
        'http://example.com',
        'https://www.example.com',
        'https://sub.domain.com/path',
        'https://example.com:8080',
        'https://example.com/path?query=value#fragment'
      ];

      validUrls.forEach(url => {
        const { isValidURL } = require('../../src/seoAnalyzer');
        expect(isValidURL(url)).toBe(true);
      });
    });

    test('should reject malformed URLs', () => {
      const invalidUrls = [
        '',
        '   ',
        'not-a-url',
        'http://',
        'https://',
        'just-text'
      ];

      const { isValidURL } = require('../../src/seoAnalyzer');
      invalidUrls.forEach(url => {
        expect(isValidURL(url)).toBe(false);
      });
    });
  });

  describe('URL Normalization', () => {
    test('should handle protocol addition correctly', () => {
      const { normalizeURL } = require('../../src/seoAnalyzer');
      
      const testCases = [
        { input: 'example.com', expected: 'https://example.com' },
        { input: 'www.example.com', expected: 'https://www.example.com' },
        { input: '  example.com  ', expected: 'https://example.com' },
        { input: 'subdomain.example.com/path', expected: 'https://subdomain.example.com/path' },
        { input: 'https://already-secure.com', expected: 'https://already-secure.com' },
        { input: 'http://not-secure.com', expected: 'http://not-secure.com' }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(normalizeURL(input)).toBe(expected);
      });
    });

    test('should handle edge cases', () => {
      const { normalizeURL } = require('../../src/seoAnalyzer');
      
      expect(normalizeURL('')).toBe('');
      expect(normalizeURL(null)).toBe('');
      expect(normalizeURL(undefined)).toBe('');
    });
  });

  describe('Score Calculation', () => {
    test('should calculate scores for realistic SEO scenarios', () => {
      const { calculateSEOScore } = require('../../src/seoAnalyzer');

      // Perfect page
      expect(calculateSEOScore([])).toBe(100);

      // Typical new website issues
      const newWebsiteIssues = [
        { type: 'critical' }, // Missing meta description
        { type: 'critical' }, // Missing H1
        { type: 'warning' },  // Missing canonical
        { type: 'warning' },  // Images without alt
        { type: 'info' }      // No structured data
      ];
      expect(calculateSEOScore(newWebsiteIssues)).toBe(51); // 100 - 30 - 16 - 3 = 51

      // Well-optimized page with minor issues
      const wellOptimizedIssues = [
        { type: 'warning' },  // Title length
        { type: 'info' }      // No structured data
      ];
      expect(calculateSEOScore(wellOptimizedIssues)).toBe(89); // 100 - 8 - 3 = 89

      // Severely problematic page
      const problematicIssues = [
        { type: 'critical' }, // Missing title
        { type: 'critical' }, // Missing meta description
        { type: 'critical' }, // Missing H1
        { type: 'warning' },  // Multiple H1s
        { type: 'warning' },  // Images without alt
        { type: 'warning' },  // Missing canonical
        { type: 'warning' },  // Missing viewport
        { type: 'info' }      // No structured data
      ];
      expect(calculateSEOScore(problematicIssues)).toBe(20); // 100 - 45 - 32 - 3 = 20
    });
  });
});

describe('Performance and Edge Cases', () => {
  test('should handle large numbers of issues efficiently', () => {
    const { calculateSEOScore } = require('../../src/seoAnalyzer');
    
    const start = Date.now();
    const manyIssues = Array(1000).fill({ type: 'warning' });
    const score = calculateSEOScore(manyIssues);
    const end = Date.now();
    
    expect(score).toBe(0); // Should be capped at 0
    expect(end - start).toBeLessThan(10); // Should be fast (less than 10ms)
  });

  test('should handle HTML parsing with complex structures', () => {
    const { analyzeHTML } = require('../../src/seoAnalyzer');
    
    // Mock a complex HTML structure
    const complexMockDoc = {
      querySelector: jest.fn().mockImplementation((selector) => {
        if (selector === 'title') return { textContent: 'Good Complex Page Title' };
        if (selector === 'meta[name="description"]') {
          return { getAttribute: () => 'A comprehensive description for this complex page structure with multiple elements and good SEO optimization.' };
        }
        if (selector === 'link[rel="canonical"]') return {};
        if (selector === 'meta[name="viewport"]') return {};
        if (selector === 'script[type="application/ld+json"]') return {};
        return null;
      }),
      querySelectorAll: jest.fn().mockImplementation((selector) => {
        if (selector === 'h1') return [{}]; // One H1
        if (selector === 'img') {
          // Multiple images, some with alt text, some without
          return [
            { getAttribute: () => 'Good alt text' },
            { getAttribute: () => null },
            { getAttribute: () => 'Another good alt' },
            { getAttribute: () => null },
            { getAttribute: () => 'Third good alt' }
          ];
        }
        return [];
      })
    };
    
    global.DOMParser = jest.fn().mockImplementation(() => ({
      parseFromString: jest.fn().mockReturnValue(complexMockDoc)
    }));

    const issues = analyzeHTML('<complex-html-structure></complex-html-structure>', 'https://complex-example.com');
    
    // Should only have issues for images without alt text
    const expectedImageIssues = issues.filter(issue => 
      issue.title.includes('Images Missing Alt Text')
    );
    expect(expectedImageIssues).toHaveLength(1);
    expect(expectedImageIssues[0].description).toContain('2 images are missing');
  });

  test('should handle malformed HTML gracefully', () => {
    const { analyzeHTML } = require('../../src/seoAnalyzer');
    
    // Mock DOMParser that might throw or return unusual results
    global.DOMParser = jest.fn().mockImplementation(() => ({
      parseFromString: jest.fn().mockReturnValue({
        querySelector: jest.fn().mockReturnValue(null),
        querySelectorAll: jest.fn().mockReturnValue([])
      })
    }));

    expect(() => {
      analyzeHTML('<<>>malformed<<html>>', 'https://example.com');
    }).not.toThrow();
  });
});