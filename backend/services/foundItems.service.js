const { foundModel } = require('../models/report.model');
const logger = require('../bin/winston.util');

module.exports.getFoundItems = async (searchFields, selectedFields) => {
  try {
    let regexp = null;
    if (searchFields.searchText !== '') regexp = new RegExp(`^${searchFields.searchText}`, 'i');

    const searchArray = [];
    let checkTags = false;

    if (searchFields.title === 'false' && searchFields.description === 'false'
    && searchFields.location === 'false' && searchFields.username === 'false') {
      checkTags = true;
    }

    if (searchFields.title === 'true' || checkTags) searchArray.push({ title: regexp });
    if (searchFields.description === 'true' || checkTags) searchArray.push({ description: regexp });
    if (searchFields.location === 'true' || checkTags) searchArray.push({ location: regexp });
    if (searchFields.username === 'true' || checkTags) searchArray.push({ firstName: regexp });

    const document = await foundModel.find(
      regexp ? {
        $or: searchArray,
      } : {},
    ).select(selectedFields).lean().exec();
    return document;
  } catch (err) {
    logger.error({
      err: err.stack,
      file: 'foundItems.service.js',
      params: {},
    });
  }
};
