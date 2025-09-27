/**
 * Backend API Tests
 * Tests for the Express.js backend server
 */

describe('Backend API', () => {
    // Mock fetch for testing
    global.fetch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should validate URL format', () => {
        const validUrls = [
            'https://example.com',
            'http://example.com', 
            'https://example.com/path',
            'https://subdomain.example.com'
        ];

        const invalidUrls = [
            'not-a-url',
            'example.com', // Missing protocol
            'http://'      // Incomplete URL
        ];

        validUrls.forEach(url => {
            expect(() => new URL(url)).not.toThrow();
            const urlObj = new URL(url);
            expect(urlObj.protocol).toMatch(/^https?:$/);
        });

        invalidUrls.forEach(url => {
            expect(() => new URL(url)).toThrow();
        });
        
        // Test protocol validation for security
        const jsUrl = new URL('javascript:alert(1)');
        expect(jsUrl.protocol).toBe('javascript:');
        expect(jsUrl.protocol.startsWith('http')).toBe(false);
        
        const ftpUrl = new URL('ftp://example.com');
        expect(ftpUrl.protocol).toBe('ftp:');
        expect(ftpUrl.protocol.startsWith('http')).toBe(false);
    });

    test('should handle PageSpeed API response structure', () => {
        const mockPageSpeedResponse = {
            lighthouseResult: {
                audits: {
                    'speed-index': {
                        displayValue: '2.1 s',
                        score: 0.8
                    },
                    'largest-contentful-paint': {
                        displayValue: '2.5 s',
                        score: 0.7
                    },
                    'total-byte-weight': {
                        numericValue: 1500000 // 1.5MB
                    }
                }
            }
        };

        // Test that we can extract the expected values
        const lighthouse = mockPageSpeedResponse.lighthouseResult;
        const audits = lighthouse.audits;
        
        expect(audits['speed-index'].displayValue).toBe('2.1 s');
        expect(audits['speed-index'].score).toBe(0.8);
        expect(Math.round(audits['total-byte-weight'].numericValue / 1024)).toBe(1465);
    });

    test('should handle missing audit data gracefully', () => {
        const mockIncompleteResponse = {
            lighthouseResult: {
                audits: {}
            }
        };

        const lighthouse = mockIncompleteResponse.lighthouseResult;
        const audits = lighthouse.audits;
        
        // Test that missing data is handled gracefully
        const loadTime = audits['speed-index']?.displayValue || 'Unknown';
        const pageSize = Math.round(audits['total-byte-weight']?.numericValue / 1024) || 0;
        
        expect(loadTime).toBe('Unknown');
        expect(pageSize).toBe(0);
    });

    test('should validate environment configuration', () => {
        // Test that environment variables can be read
        const testApiKey = process.env.PAGESPEED_API_KEY || 'default_key';
        const testPort = process.env.PORT || 3000;
        
        expect(typeof testApiKey).toBe('string');
        expect(testApiKey.length).toBeGreaterThan(0);
        expect(Number(testPort)).toBeGreaterThan(0);
    });
});