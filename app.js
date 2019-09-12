const express = require('express');
const routes = require('./routes/index');
const { logIncomingRequest } = require('./handlers/loggerHandler');
const { notFound, error } = require('./handlers/errorHandler');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/appstatus', (req, res) => {
  res.status(200).json({ code: 200, message: 'OK' });
});

app.use(logIncomingRequest);

app.use('/', routes);

app.use(notFound);

app.use(error);

module.exports = app;
