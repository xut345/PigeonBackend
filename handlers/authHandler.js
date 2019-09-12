const { isTokenValid } = require('../services/authService');
const { respondUnauthorized } = require('./errorHandler');

const isAuthenticated = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (isTokenValid(authToken)) {
    next();
    return;
  }

  respondUnauthorized();
};

module.exports = {
  isAuthenticated
};
