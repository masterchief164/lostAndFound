const { foundModel } = require('../models/report.model');
const logger = require('../bin/winston.util');

module.exports.getFoundItems = async (selectedFields) => {
  try {
    const document = await foundModel.find({}).select(selectedFields).lean().exec();
    return document;
  } catch (err) {
    logger.error({
      err: err.stack,
      file: 'foundItems.service.js',
      params: {},
    });
  }
};
