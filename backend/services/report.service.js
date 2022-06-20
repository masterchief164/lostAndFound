const { lostModel, foundModel } = require('../models/report.model');
const logger = require('../bin/winston.util');

module.exports.saveItem = async (data) => {
  try {
    if (data.type === 'Lost') {
      const document = new lostModel(data);
      return await document.save();
    }

    const document = new foundModel(data);
    return await document.save();
  } catch (err) {
    logger.error({
      err: err.stack,
      file: 'report.service.js',
      params: {},
    });
  }
};
