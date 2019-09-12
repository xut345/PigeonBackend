const { respondNotFound } = require('../../handlers/errorHandler');

const getData = async id => {
  if (id !== '1') {
    respondNotFound();
  }
  return '1';
};

module.exports = {
  getData
};
