const { isTokenValid } = require('../authService');

test('Valid token', () => {
  expect(
    isTokenValid(
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiaWF0IjoxNTQxMTg2MTEwfQ.w-aABAzyMEjaU0Gdbjy1M3dEbyY1Y3XR0A8zldzOSn8'
    )
  ).toBe(true);
});

test('Token missing Bearer', () => {
  expect(
    isTokenValid(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiaWF0IjoxNTQxMTg2MTEwfQ.w-aABAzyMEjaU0Gdbjy1M3dEbyY1Y3XR0A8zldzOSn8'
    )
  ).toBe(false);
});

test('Malformed token', () => {
  expect(
    isTokenValid(
      'Bearer hbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiaWF0IjoxNTQxMTg2MTEwfQ.w-aABAzyMEjaU0Gdbjy1M3dEbyY1Y3XR0A8zldzOSn8'
    )
  ).toBe(false);
});
