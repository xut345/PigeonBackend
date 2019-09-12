const request = require('supertest');
const app = require('../../app');
const json = 'application/json';

const authorization = 'Authorization';
const jwt =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiaWF0IjoxNTQxMTg2MTEwfQ.w-aABAzyMEjaU0Gdbjy1M3dEbyY1Y3XR0A8zldzOSn8';

test('Should respond with a 200', async () => {
  const response = await request(app).get('/getData/1');
  expect(response.statusCode).toBe(200);
  expect(response.type).toBe(json);
});

test('Should respond with a 404', async () => {
  const response = await request(app).get('/getData/9999');
  expect(response.statusCode).toBe(404);
  expect(response.type).toBe(json);
});

test('Should respond with a 200', async () => {
  const response = await request(app)
    .get('/getDataSecure/1')
    .set(authorization, jwt);
  expect(response.statusCode).toBe(200);
  expect(response.type).toBe(json);
});

test('Should respond with a 401', async () => {
  const response = await request(app).get('/getDataSecure/1');
  expect(response.statusCode).toBe(401);
  expect(response.type).toBe(json);
});
