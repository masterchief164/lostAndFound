const { saveItem } = require('../services/report.service');
const logger = require('../bin/winston.util');
const { cloudinary } = require('../utils/cloudinary');

module.exports.createItem = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data);
    const image = data.image;
    console.log(image);
    if (image != null && image !== 'default') {
      const uploadedImage = await cloudinary.uploader.upload(image, { upload_preset: 'lostAndFound' });
      console.log(uploadedImage.secure_url);
      data.image = uploadedImage.secure_url;
    }
    const document = await saveItem(data);
    console.log(document);
    res.send(document);
  } catch (err) {
    logger.error({
      err: err.stack,
      file: 'report.controller.js',
      params: {},
    });
  }
};
