const logger = require('../bin/winston.util');
const { getFoundItems } = require('../services/foundItems.service');
const { getFoundItemsDTO } = require('../dto/foundItems.dto');

module.exports.getItems = async (req, res) => {
  try {
    const document = await getFoundItems(getFoundItemsDTO.selectedFields);
    const data = document.map(getFoundItemsDTO.execute);
    res.send(data);
  } catch (err) {
    logger.error({
      err: err.stack,
      file: 'foundItems.controller.js',
      params: {},
    });
  }
};
