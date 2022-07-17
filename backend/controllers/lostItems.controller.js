const logger = require('../bin/winston.util');
const { getAllLostItems } = require('../services/lostItems.service');
const { getLostItemsDTO } = require('../dto/lostItems.dto');
const { lostModel } = require('../models/report.model');

module.exports.getItems = async (req, res) => {
  const searchFields = req.query;
  try {
    const document = await getAllLostItems(searchFields, getLostItemsDTO.selectedFields);
    const data = document.map(getLostItemsDTO.execute);
    res.send(data);
  } catch (err) {
    logger.error({
      err: err.stack,
      file: 'lostItems.controller.js',
      params: {},
    });
  }
};

module.exports.foundIt = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const document = await lostModel.findOne({ _id: id });
    if (document.claimedBy) {
      res.status(208).send('Item already claimed');
    } else {
      await lostModel.findOneAndUpdate({ _id: id }, { claimedBy: user.email });
      res.status(200).send('Item claimed');
    }
  } catch (err) {
    logger.error({
      err: err.stack,
      file: 'lostItems.controller.js',
      params: {},
    });
  }
};
