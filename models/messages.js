let database = null;
/* istanbul ignore next */
if (process.env.NODE_ENV === 'test') {
  database = require('../services/__mock__/firestore');
} else {
  database = require('../services/firestore');
}
const moment = require('moment');
const { respondNotFound } = require('../handlers/errorHandler');

const sendPigeon = async (name, topic, message_content, isPublic) => {
  const message = {
    message_contents: message_content,
    sent_by: name,
    sent_time: moment().format('MMMM Do YYYY, h:mm:ss a')
  };

  const pigeon = {
    currently_at: '',
    sent_by: name,
    created_time: moment().format('MMMM Do YYYY, h:mm:ss a'),
    viewable_by: [name],
    is_public: isPublic,
    messages: [message],
    topic: topic
  };

  const pigeonId = await database.insertRecord('Pigeon', pigeon);
  await database.insertSubRecord('Pigeon', pigeonId, 'Messages', message);
  return pigeonId;
};

const getRandomMessage = async name => {
  const ids = await database.getWhere('Messages', 'currently_at', name);
  if (ids.length === 0) {
    respondNotFound();
  } else {
    const id = ids[Math.floor(Math.random() * ids.length)];
    database.updateRecord('Messages', id, { currently_at: name });
    database.updateArray('Messages', id, 'viewable_by', name);
    return await database.getRecordById('Messages', id);
  }
};

module.exports = {
  sendPigeon,
  getRandomMessage
};
