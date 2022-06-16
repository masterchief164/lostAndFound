const {lostModel} = require('../models/report.model');
const logger = require('../bin/winston.util');

module.exports.getAllLostItems = async (selectedFields) => {
    try {
       let document = await lostModel.find({}).select(selectedFields).lean().exec();
       return document;
    }catch (err) {
        logger.error({
            err: err.stack,
            file: 'lostItems.service.js',
            params: {},
          });
    }
  
  }