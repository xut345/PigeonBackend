const express = require('express');
const router = express.Router();
const controller = require('../controllers/example');
const authController = require('../controllers/auth');
const authHandler = require('../handlers/authHandler');
const { catchErrors } = require('../handlers/errorHandler');
const messages = require('../controllers/messages');

const cors = require('cors');
// TODO: Change allowed origin depending on environment.
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
};
router.options('*', cors(corsOptions));

router.get('/getData/:id', catchErrors(controller.getData));

router.get(
  '/getDataSecure/:id',
  authHandler.isAuthenticated,
  catchErrors(controller.getData)
);

router.post('/register', catchErrors(authController.register));

router.post('/login', catchErrors(authController.login));

router.post('/logout', catchErrors(authController.logout));

router.post('/sendPigeon', catchErrors(messages.sendPigeon));

router.post('/sendMultiPigeons', catchErrors(messages.sendMultiPigeons));

router.get('/getRandomMessage', catchErrors(messages.getRandomMessage));

module.exports = router;
