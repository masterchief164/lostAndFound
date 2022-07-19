const logger = require('../bin/winston.util');
const { getFoundItems, checkClaimed } = require('../services/foundItems.service');
const { getFoundItemsDTO } = require('../dto/foundItems.dto');

module.exports.getItems = async (req, res) => {
  const searchFields = req.query;
  try {
    const document = await getFoundItems(searchFields, getFoundItemsDTO.selectedFields);
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

module.exports.claimIt = async (req, res) => {
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
      file: 'foundItems.controller.js',
      params: {},
    });
  }
};
