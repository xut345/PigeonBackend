let database = null;
/* istanbul ignore next */
if (process.env.NODE_ENV === 'test') {
  database = require('../services/__mock__/firestore');
} else {
  database = require('../services/firestore');
}

const getData = async id => {
  return await database.getRecordById('Users', id);
};

module.exports = {
  getData
};
