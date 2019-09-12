const request = require('supertest');
const app = require('../../app');
const contentType = 'Content-Type';
const json = 'application/json';
const loginPath = '/login';
const email = 'test';
const password = 'password';
const invalid = 'invalid';

test('Test valid login', async () => {
  const response = await request(app)
    .post(loginPath)
    .send({
      email: email,
      password: password
    })
    .set(contentType, json);
  expect(response.statusCode).toBe(200);
  expect(response.type).toBe(json);
  expect(response.body.authorization).toBeTruthy();
});

test('Test invalid password', async () => {
  const response = await request(app)
    .post(loginPath)
    .send({
      email: email,
      password: invalid
    })
    .set(contentType, json);
  expect(response.statusCode).toBe(401);
  expect(response.type).toBe(json);
  expect(response.body.authorization).toBeFalsy();
});

test('Test invalid email', async () => {
  const response = await request(app)
    .post(loginPath)
    .send({
      email: invalid,
      password: password
    })
    .set(contentType, json);
  expect(response.statusCode).toBe(401);
  expect(response.type).toBe(json);
  expect(response.body.authorization).toBeFalsy();
});

test('Test logout', async () => {
  const response = await request(app)
    .post('/logout')
    .set(contentType, json);
  expect(response.statusCode).toBe(200);
  expect(response.type).toBe(json);
});

test('Test registering', async () => {
  const response = await request(app)
    .post('/register')
    .send({
      email: email,
      password: password
    })
    .set(contentType, json);
  expect(response.statusCode).toBe(201);
  expect(response.type).toBe(json);
  expect(response.body.authorization).toBeTruthy();
});

test('Test registering with duplicate email', async () => {
  const response = await request(app)
    .post('/register')
    .send({
      email: 'existingEmail',
      password: password
    })
    .set(contentType, json);
  expect(response.statusCode).toBe(409);
  expect(response.type).toBe(json);
  expect(response.body.authorization).toBeFalsy();
});
