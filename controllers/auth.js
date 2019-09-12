let authModel = null;
/* istanbul ignore next */
if (process.env.NODE_ENV === 'test') {
  authModel = require('../models/__mock__/auth.js');
} else {
  authModel = require('../models/auth.js');
}
const { generateToken } = require('../services/authService');

const login = async (req, res) => {
  const body = req.body;
  await authModel.login(body.email, body.password);
  sendResponse(res, { authorization: generateToken() });
};

const logout = (req, res) => {
  sendResponse(res);
};

const register = async (req, res) => {
  const body = req.body;
  await authModel.register(body.email, body.password);
  res.status(201);
  sendResponse(res, { authorization: generateToken() });
};

const sendResponse = (res, data) => {
  res.json(data);
};

module.exports = {
  login,
  logout,
  register
};
