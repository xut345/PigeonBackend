const model = require('../example');
const { notFoundError } = require('../../handlers/errorHandler');

test('Test getting data with a valid id', async () => {
  const response = await model.getData('1');
  expect(response).toBe('1');
});

test('Test getting data with an invalid id', async () => {
  expectNotFoundThrown(() => model.getData('9999'));
});

const expectNotFoundThrown = async fn => {
  expect.assertions(1);
  await expect(fn()).rejects.toEqual(notFoundError());
};
