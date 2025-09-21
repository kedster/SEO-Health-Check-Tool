/**
 * Jest setup file for SEO Health Check Tool tests
 * Sets up global test environment and mocks
 */

// Mock fetch API
global.fetch = jest.fn();

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});