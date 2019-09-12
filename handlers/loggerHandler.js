const { loggerService } = require('../services/loggerService');

exports.logIncomingRequest = (req, res, next) => {
  loggerService.info({
    message: `Incoming request to ${req.path}`,
    ip: req.ip,
    method: req.method,
    protocol: req.protocol,
    route: req.path,
    secure: req.secure
  });

  next();
};
