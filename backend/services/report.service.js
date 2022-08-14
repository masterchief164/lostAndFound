const { lostModel, foundModel } = require('../models/report.model');

module.exports.saveItem = async (data) => {
  try {
    if (data.type === 'Lost') {
      const document = new lostModel(data);
      return await document.save();
    }

    const document = new foundModel(data);
    return await document.save();
  } catch (err) {
    console.log(err);
  }
};
