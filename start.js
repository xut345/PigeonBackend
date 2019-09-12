const app = require('./app');
const { loggerService } = require('./services/loggerService');

app.set('port', 2091);
const server = app.listen(app.get('port'), () => {
  loggerService.info({
    message: `Express running → PORT ${server.address().port}`
  });
});
