const logger = require('../bin/winston.util');
const { getAllLostItems } = require('../services/lostItems.service');
const { getLostItemsDTO } = require('../dto/lostItems.dto');

module.exports.getItems = async (req, res) => {
  try {
    const document = await getAllLostItems(getLostItemsDTO.selectedFields);
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
