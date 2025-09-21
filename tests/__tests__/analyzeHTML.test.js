/**
 * Unit tests for SEO HTML analysis functions
 */

const { analyzeHTML, isValidURL, normalizeURL, calculateSEOScore } = require('../../src/seoAnalyzer');

describe('analyzeHTML', () => {
  beforeEach(() => {
    // Mock DOMParser for each test
    global.DOMParser = jest.fn();
  });

  describe('Title Tag Analysis', () => {
    test('should identify missing title tag', () => {
      const mockDoc = {
        querySelector: jest.fn().mockImplementation((selector) => {
          if (selector === 'title') return null;
          return null;
        }),
        querySelectorAll: jest.fn().mockReturnValue([])
      };
      
      global.DOMParser.mockImplementation(() => ({
        parseFromString: jest.fn().mockReturnValue(mockDoc)
      }));

      const issues = analyzeHTML('<html><head></head><body><h1>Content</h1></body></html>', 'https://example.com');
      
      expect(issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'critical',
            title: '❌ Missing Title Tag',
            description: 'No title tag found on this page.'
          })
        ])
      );
    });

    test('should identify title tag with optimal length', () => {
      const mockDoc = {
        querySelector: jest.fn().mockImplementation((selector) => {
          if (selector === 'title') {
            return { textContent: 'Perfect SEO Title Tag Length Test' }; // 35 characters - optimal
          }
          if (selector === 'meta[name="description"]') {
            return { getAttribute: () => 'A good meta description that is the right length for SEO purposes and testing.' };
          }
          return null;
        }),
        querySelectorAll: jest.fn().mockImplementation((selector) => {
          if (selector === 'h1') return [{}]; // One H1 tag
          if (selector === 'img') return [];
          return [];
        })
      };
      
      global.DOMParser.mockImplementation(() => ({
        parseFromString: jest.fn().mockReturnValue(mockDoc)
      }));

      const issues = analyzeHTML('<html></html>', 'https://example.com');
      
      // Should not have title-related issues
      const titleIssues = issues.filter(issue => 
        issue.title.includes('Title Tag')
      );
      expect(titleIssues).toHaveLength(0);
    });

    test('should identify title tag that is too short', () => {
      const mockDoc = {
        querySelector: jest.fn().mockImplementation((selector) => {
          if (selector === 'title') {
            return { textContent: 'Short' }; // 5 characters - too short
          }
          return null;
        }),
        querySelectorAll: jest.fn().mockReturnValue([])
      };
      
      global.DOMParser.mockImplementation(() => ({
        parseFromString: jest.fn().mockReturnValue(mockDoc)
      }));

      const issues = analyzeHTML('<html></html>', 'https://example.com');
      
      expect(issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'warning',
            title: '⚠️ Title Tag Length Issue',
            description: 'Title tag is 5 characters. Optimal length is 50-60 characters.'
          })
        ])
      );
    });

    test('should identify title tag that is too long', () => {
      const longTitle = 'This is a very long title tag that exceeds the recommended length for SEO optimization and may be truncated in search results';
      
      const mockDoc = {
        querySelector: jest.fn().mockImplementation((selector) => {
          if (selector === 'title') {
            return { textContent: longTitle }; // 128 characters - too long
          }
          return null;
        }),
        querySelectorAll: jest.fn().mockReturnValue([])
      };
      
      global.DOMParser.mockImplementation(() => ({
        parseFromString: jest.fn().mockReturnValue(mockDoc)
      }));

      const issues = analyzeHTML('<html></html>', 'https://example.com');
      
      expect(issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'warning',
            title: '⚠️ Title Tag Length Issue',
            description: `Title tag is ${longTitle.length} characters. Optimal length is 50-60 characters.`
          })
        ])
      );
    });
  });

  describe('Meta Description Analysis', () => {
    test('should identify missing meta description', () => {
      const mockDoc = {
        querySelector: jest.fn().mockImplementation((selector) => {
          if (selector === 'title') return { textContent: 'Good Title Length for Testing' };
          if (selector === 'meta[name="description"]') return null;
          return null;
        }),
        querySelectorAll: jest.fn().mockReturnValue([])
      };
      
      global.DOMParser.mockImplementation(() => ({
        parseFromString: jest.fn().mockReturnValue(mockDoc)
      }));

      const issues = analyzeHTML('<html></html>', 'https://example.com');
      
      expect(issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'critical',
            title: '❌ Missing Meta Description',
            description: 'No meta description found on this page.'
          })
        ])
      );
    });

    test('should identify meta description that is too short', () => {
      const shortDesc = 'Too short'; // 9 characters
      
      const mockDoc = {
        querySelector: jest.fn().mockImplementation((selector) => {
          if (selector === 'title') return { textContent: 'Good Title Length for Testing' };
          if (selector === 'meta[name="description"]') {
            return { getAttribute: () => shortDesc };
          }
          return null;
        }),
        querySelectorAll: jest.fn().mockImplementation((selector) => {
          if (selector === 'h1') return [{}]; // One H1 tag
          return [];
        })
      };
      
      global.DOMParser.mockImplementation(() => ({
        parseFromString: jest.fn().mockReturnValue(mockDoc)
      }));

      const issues = analyzeHTML('<html></html>', 'https://example.com');
      
      expect(issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'warning',
            title: '📝 Meta Description Length Issue',
            description: `Meta description is ${shortDesc.length} characters. Optimal length is 150-160 characters.`
          })
        ])
      );
    });
  });

  describe('H1 Tag Analysis', () => {
    test('should identify missing H1 tag', () => {
      const mockDoc = {
        querySelector: jest.fn().mockImplementation((selector) => {
          if (selector === 'title') return { textContent: 'Good Title Length' };
          if (selector === 'meta[name="description"]') {
            return { getAttribute: () => 'A good meta description that is the right length for SEO purposes and testing.' };
          }
          return null;
        }),
        querySelectorAll: jest.fn().mockImplementation((selector) => {
          if (selector === 'h1') return []; // No H1 tags
          if (selector === 'img') return [];
          return [];
        })
      };
      
      global.DOMParser.mockImplementation(() => ({
        parseFromString: jest.fn().mockReturnValue(mockDoc)
      }));

      const issues = analyzeHTML('<html></html>', 'https://example.com');
      
      expect(issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'critical',
            title: '❌ Missing H1 Tag'
          })
        ])
      );
    });

    test('should identify multiple H1 tags', () => {
      const mockDoc = {
        querySelector: jest.fn().mockImplementation((selector) => {
          if (selector === 'title') return { textContent: 'Good Title Length' };
          if (selector === 'meta[name="description"]') {
            return { getAttribute: () => 'A good meta description that is the right length for SEO purposes and testing.' };
          }
          return null;
        }),
        querySelectorAll: jest.fn().mockImplementation((selector) => {
          if (selector === 'h1') return [{}, {}, {}]; // 3 H1 tags
          if (selector === 'img') return [];
          return [];
        })
      };
      
      global.DOMParser.mockImplementation(() => ({
        parseFromString: jest.fn().mockReturnValue(mockDoc)
      }));

      const issues = analyzeHTML('<html></html>', 'https://example.com');
      
      expect(issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'warning',
            title: '⚠️ Multiple H1 Tags'
          })
        ])
      );
    });
  });

  describe('Image Analysis', () => {
    test('should identify images without alt text', () => {
      const mockDoc = {
        querySelector: jest.fn().mockImplementation((selector) => {
          if (selector === 'title') return { textContent: 'Good Title Length' };
          if (selector === 'meta[name="description"]') {
            return { getAttribute: () => 'A good meta description that is the right length for SEO purposes and testing.' };
          }
          return null;
        }),
        querySelectorAll: jest.fn().mockImplementation((selector) => {
          if (selector === 'h1') return [{}]; // One H1 tag
          if (selector === 'img') {
            return [
              { getAttribute: () => null }, // Image without alt
              { getAttribute: () => 'Good alt text' }, // Image with alt
              { getAttribute: () => null } // Another image without alt
            ];
          }
          return [];
        })
      };
      
      global.DOMParser.mockImplementation(() => ({
        parseFromString: jest.fn().mockReturnValue(mockDoc)
      }));

      const issues = analyzeHTML('<html></html>', 'https://example.com');
      
      expect(issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'warning',
            title: '🖼️ Images Missing Alt Text',
            description: '2 images are missing alt text attributes.'
          })
        ])
      );
    });
  });
});

describe('URL Validation Functions', () => {
  describe('isValidURL', () => {
    test('should validate correct URLs', () => {
      expect(isValidURL('https://example.com')).toBe(true);
      expect(isValidURL('http://example.com')).toBe(true);
      expect(isValidURL('https://subdomain.example.com/path?query=value')).toBe(true);
    });

    test('should reject invalid URLs', () => {
      expect(isValidURL('not-a-url')).toBe(false);
      expect(isValidURL('ftp://invalid.com')).toBe(true); // Note: URL constructor accepts ftp
      expect(isValidURL('')).toBe(false);
      expect(isValidURL('   ')).toBe(false);
    });
  });

  describe('normalizeURL', () => {
    test('should add https:// to URLs without protocol', () => {
      expect(normalizeURL('example.com')).toBe('https://example.com');
      expect(normalizeURL('www.example.com')).toBe('https://www.example.com');
    });

    test('should preserve existing protocols', () => {
      expect(normalizeURL('http://example.com')).toBe('http://example.com');
      expect(normalizeURL('https://example.com')).toBe('https://example.com');
    });

    test('should handle edge cases', () => {
      expect(normalizeURL('')).toBe('');
      expect(normalizeURL('   example.com   ')).toBe('https://example.com');
    });
  });
});

describe('calculateSEOScore', () => {
  test('should calculate score correctly for no issues', () => {
    expect(calculateSEOScore([])).toBe(100);
  });

  test('should deduct points for critical issues', () => {
    const issues = [
      { type: 'critical' },
      { type: 'critical' }
    ];
    expect(calculateSEOScore(issues)).toBe(70); // 100 - (2 * 15)
  });

  test('should deduct points for warning issues', () => {
    const issues = [
      { type: 'warning' },
      { type: 'warning' },
      { type: 'warning' }
    ];
    expect(calculateSEOScore(issues)).toBe(76); // 100 - (3 * 8)
  });

  test('should deduct points for info issues', () => {
    const issues = [
      { type: 'info' },
      { type: 'info' }
    ];
    expect(calculateSEOScore(issues)).toBe(94); // 100 - (2 * 3)
  });

  test('should handle mixed issue types', () => {
    const issues = [
      { type: 'critical' },
      { type: 'warning' },
      { type: 'info' }
    ];
    expect(calculateSEOScore(issues)).toBe(74); // 100 - 15 - 8 - 3
  });

  test('should not go below zero', () => {
    const issues = Array(20).fill({ type: 'critical' }); // 20 * 15 = 300 points
    expect(calculateSEOScore(issues)).toBe(0);
  });
});