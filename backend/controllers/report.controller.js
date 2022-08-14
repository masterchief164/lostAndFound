const { saveItem } = require('../services/report.service');
const { cloudinary } = require('../utils/cloudinary');

module.exports.createItem = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data);
    const image = data.image;
    // console.log(data.firstName);
    if (image != null && image !== 'default') {
      const uploadedImage = await cloudinary.uploader.upload(image, { upload_preset: 'lostAndFound' });
      // console.log(uploadedImage.secure_url);
      data.image = uploadedImage.secure_url;
    }
    const document = await saveItem(data);
    // console.log(document);
    res.send(document);
  } catch (err) {
    console.log(err);
  }
};
