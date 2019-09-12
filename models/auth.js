let database = null;
/* istanbul ignore next */
if (process.env.NODE_ENV === 'test') {
  database = require('../services/__mock__/firestore');
} else {
  database = require('../services/firestore');
}
const { compare, hash } = require('bcrypt');
const {
  respondUnauthorized,
  respondConflict
} = require('../handlers/errorHandler');

const invalidCredentialsMessage = 'Email/password combo is not valid.';
const duplicateEmailMessage = 'This email address is already used.';

const login = async (email, password) => {
  const user = await database.getUser(email);
  if (!user) {
    respondUnauthorized(invalidCredentialsMessage);
  }
  await checkPasswordsMatch(password, user.password);
};

const checkPasswordsMatch = async (plainTextPassword, hashedPassword) => {
  const match = await compare(plainTextPassword, hashedPassword);
  if (!match) {
    respondUnauthorized(invalidCredentialsMessage);
  }
};

const register = async (email, password) => {
  const user = await database.getUser(email);
  if (user) {
    respondConflict(duplicateEmailMessage);
  }
  await hash(password, 12).then(
    async hashedPassword =>
      await database.insertRecord('Users', {
        email: email,
        password: hashedPassword
      })
  );
};

module.exports = {
  login,
  register
};

/* istanbul ignore next */
if (process.env.NODE_ENV === 'test') {
  Object.assign(module.exports, {
    invalidCredentialsMessage,
    duplicateEmailMessage
  });
}
