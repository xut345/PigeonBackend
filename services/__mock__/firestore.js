const { respondNotFound } = require('../../handlers/errorHandler');

const getRecordById = async (type, id) => {
  if (id !== '1') {
    respondNotFound();
  }
  return '1';
};

const getUser = async id => {
  if (id !== 'notExists') {
    return {
      password: '$2b$12$Tdf78vXQlGjjpzkgvKE4YOq2lU6LBIGSxEpsS4e1hK2cGTJT5q2ha'
    };
  }
};

const insertRecord = async () => '1';

const insertSubRecord = async () => '1';

const getWhere = async (_, __, name) => {
  if (name !== 'testuser') {
    return [];
  } else {
    return '1';
  }
};

const updateRecord = async () => {};

const updateArray = async () => {};

module.exports = {
  getRecordById,
  getUser,
  insertRecord,
  insertSubRecord,
  getWhere,
  updateRecord,
  updateArray
};
