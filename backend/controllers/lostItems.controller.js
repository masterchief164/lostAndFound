const logger = require('../bin/winston.util');
const { getAllLostItems, checkClaimed } = require('../services/lostItems.service');
const { getLostItemsDTO } = require('../dto/lostItems.dto');

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
    const document = await checkClaimed({ id, user });
    if (document) {
      res.send({ status: 1, data: document });
    } else res.send({ status: 0, data: null });
  } catch (err) {
    logger.error({
      err: err.stack,
      file: 'lostItems.controller.js',
      params: {},
    });
  }
};
