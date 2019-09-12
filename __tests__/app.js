const request = require('supertest');
const app = require('../app');
const json = 'application/json';

test('Test appstatus endpoint', async () => {
  const response = await request(app).get('/appstatus');
  expect(response.statusCode).toBe(200);
  expect(response.type).toBe(json);
});

test('Test non-existing endpoint', async () => {
  const response = await request(app).get('/invalidPath');
  expect(response.statusCode).toBe(404);
  expect(response.type).toBe(json);
});
