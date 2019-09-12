const model = require('../messages');
const { notFoundError } = require('../../handlers/errorHandler');
const existingUser = 'testuser';
const validContent = 'content';
const validTopic = 'plzwork';

test('Test send pigeon with valid content', async () => {
  await model.sendPigeon(existingUser, validTopic, validContent, false);
});

test('Test receive a random message', async () => {
  await model.getRandomMessage(existingUser);
});

test('Test receive a unavaliable message', async () => {
  await expectNotFoundThrown(() => model.getRandomMessage('1'));
});

const expectNotFoundThrown = async fn => {
  expect.assertions(1);
  await expect(fn()).rejects.toEqual(notFoundError());
};
