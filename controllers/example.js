let model = null;
/* istanbul ignore next */
if (process.env.NODE_ENV === 'test') {
  model = require('../models/__mock__/example');
} else {
  model = require('../models/example');
}

const getData = async (req, res) => {
  const data = await model.getData(req.params.id);
  sendResponse(data, res);
};

const sendResponse = (data, res) => {
  res.json({ data: data });
};

module.exports = {
  getData
};
