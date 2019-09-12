const model = require('../auth.js');
const {
  unauthorizedError,
  conflictError
} = require('../../handlers/errorHandler');
const existingEmail = 'test';
const nonExistingEmail = 'notExists';
const validPassword = 'password';
const invalidPassword = 'wrongPassword';

test('Test valid login', async () => {
  await model.login(existingEmail, validPassword);
});

test('Test login with invalid email', async () => {
  await expectUnauthorizedThrown(() =>
    model.login(nonExistingEmail, validPassword)
  );
});

test('Test login with invalid password', async () => {
  await expectUnauthorizedThrown(() =>
    model.login(existingEmail, invalidPassword)
  );
});

test('Test registering', async () => {
  await model.register(nonExistingEmail, validPassword);
});

test('Test registering with used email', async () => {
  await expectConflictThrown(() =>
    model.register(existingEmail, validPassword)
  );
});

const expectUnauthorizedThrown = async fn => {
  expect.assertions(1);
  await expect(fn()).rejects.toEqual(
    unauthorizedError(model.invalidCredentialsMessage)
  );
};

const expectConflictThrown = async fn => {
  expect.assertions(1);
  await expect(fn()).rejects.toEqual(
    conflictError(model.duplicateEmailMessage)
  );
};
