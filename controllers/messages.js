let model = null;
/* istanbul ignore next */
if (process.env.NODE_ENV === 'test') {
  model = require('../models/__mock__/messages');
} else {
  model = require('../models/messages');
}
const { respondUnprocessable } = require('../handlers/errorHandler');
const emptyMessage = 'Cannot input empty message';

const sendPigeon = async (req, res) => {
  const body = req.body;
  if (body.message_content.length === 0 || body.topic.length === 0) {
    respondUnprocessable(emptyMessage);
  } else {
    const id = await model.sendPigeon(
      body.name,
      body.topic,
      body.message_content,
      body.isPublic
    );
    res.status(201);
    sendResponse(res, { pigeonid: id });
  }
};

const sendMultiPigeons = async (req, res) => {
  const pigeonIds = [];
  for (let i = 0; i < req.body.num; i++) {
    pigeonIds.push(
      await model.sendPigeon(
        req.body.name,
        req.body.topic,
        req.body.message_content,
        req.body.isPublic
      )
    );
  }
  res.status(201);
  sendResponse(res, { pigeonids: pigeonIds });
};

const getRandomMessage = async (req, res) => {
  const message = await model.getRandomMessage(req.body.name);
  sendResponse(res, message);
};

const sendResponse = (res, data) => {
  res.json(data);
};

module.exports = {
  sendPigeon,
  sendMultiPigeons,
  getRandomMessage
};
