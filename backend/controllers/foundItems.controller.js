const logger = require('../bin/winston.util');
const { getFoundItems } = require('../services/foundItems.service');
const { getFoundItemsDTO } = require('../dto/foundItems.dto');
const { foundModel } = require('../models/report.model');

module.exports.getItems = async (req, res) => {
  const searchFields = req.query;
  try {
    const document = await getFoundItems(searchFields, getFoundItemsDTO.selectedFields);
    const data = document.map(getFoundItemsDTO.execute);
    res.send(data);
  } catch (err) {
    logger.error({
      err: err.stack,
      file: 'lfoundItems.controller.js',
      params: {},
    });
  }
};

module.exports.claimIt = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const document = await foundModel.findOne({ _id: id });
    if (document.claimedBy) {
      res.status(208).send('Item already claimed');
    } else {
      await foundModel.findOneAndUpdate({ _id: id }, { claimedBy: user.email });
      res.status(200).send('Item claimed');
    }
  } catch (err) {
    logger.error({
      err: err.stack,
      file: 'foundItems.controller.js',
      params: {},
    });
  }
};
