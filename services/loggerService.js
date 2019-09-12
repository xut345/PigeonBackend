const pino = require('pino');

const loggerService = pino({
  base: null,
  prettyPrint: {
    colorize: true,
    translateTime: true,
    messageKey: 'message'
  }
});

module.exports = {
  loggerService
};
