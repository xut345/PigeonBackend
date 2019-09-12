const {
  respondUnauthorized,
  respondConflict
} = require('../../handlers/errorHandler');

const login = async (email, password) => {
  const validEmail = 'test';
  const validPassword = 'password';
  if (email !== validEmail || password !== validPassword) {
    respondUnauthorized();
  }
};

const register = async email => {
  if (email === 'existingEmail') {
    respondConflict();
  }
};

module.exports = {
  login,
  register
};
