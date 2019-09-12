const request = require('supertest');
const app = require('../../app');
const contentType = 'Content-Type';
const json = 'application/json';
const existingUser = 'testuser';
const validTopic = 'plzwork';
const validContent = 'content';
const multipleMessages = 'multiplemessage';

test('Test send pigeon with valid content', async () => {
  const response = await request(app)
    .post('/sendPigeon')
    .send({
      name: existingUser,
      topic: validTopic,
      message_content: validContent,
      isPublic: false
    })
    .set(contentType, json);
  expect(response.statusCode).toBe(201);
  expect(response.type).toBe(json);
});

test('Test send pigeon with empty content', async () => {
  const response = await request(app)
    .post('/sendPigeon')
    .send({
      name: existingUser,
      topic: validTopic,
      message_content: '',
      isPublic: false
    })
    .set(contentType, json);
  expect(response.statusCode).toBe(422);
  expect(response.type).toBe(json);
});

test('Test send multiple pigeons', async () => {
  const response = await request(app)
    .post('/sendMultiPigeons')
    .send({
      name: existingUser,
      message_content: multipleMessages,
      num: 3
    })
    .set(contentType, json);
  expect(response.statusCode).toBe(201);
});

test('Test receive a random message', async () => {
  const response = await request(app)
    .get('/getRandomMessage')
    .send({
      name: existingUser
    })
    .set(contentType, json);
  expect(response.statusCode).toBe(200);
  expect(response.type).toBe(json);
});
