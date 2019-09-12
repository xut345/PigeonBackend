const { loggerService } = require('../services/loggerService');

const catchErrors = fn => {
  return (req, res, next) => {
    return fn(req, res, next).catch(next);
  };
};

const notFound = (req, res, next) => {
  next(notFoundError());
};

const error = (err, req, res, next) => {
  /* istanbul ignore next */
  res.status(err.status || 500);
  if (err.message) {
    res.json({ message: err.message });
  }
  res.json();

  loggerService.error({
    message: err.message,
    ip: req.ip,
    method: req.method,
    protocol: req.protocol,
    route:
      req.hasOwnProperty('route') && req.route.hasOwnProperty('path')
        ? req.route.path
        : req.route,
    secure: req.secure
  });
};

const respondNotFound = () => {
  throw notFoundError();
};

const respondUnauthorized = message => {
  throw unauthorizedError(message);
};

const respondConflict = message => {
  throw conflictError(message);
};

const respondUnprocessable = message => {
  throw unprocessableError(message);
};

const createError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

const notFoundError = () => {
  return createError(404, 'Not Found');
};

const unauthorizedError = message => {
  return createError(401, message);
};

const conflictError = message => {
  return createError(409, message);
};

const unprocessableError = message => {
  return createError(422, message);
};

module.exports = {
  catchErrors,
  notFound,
  error,
  respondNotFound,
  respondUnauthorized,
  respondConflict,
  notFoundError,
  unauthorizedError,
  conflictError,
  respondUnprocessable,
  unprocessableError
};
