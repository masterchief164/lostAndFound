const { saveItem } = require('../services/report.service');
const { cloudinary } = require('../utils/cloudinary');

module.exports.createItem = async (req, res) => {
  try {
    const data = req.body;
    const image = data.image;
    if (image != null && image !== 'default') {
      const uploadedImage = await cloudinary.uploader.upload(image, { upload_preset: 'lostAndFound' });
      data.image = uploadedImage.secure_url;
    }
    data.firstName = req.user.given_name;
    data.lastName = req.user.family_name;
    console.log(data);
    const document = await saveItem(data);
    res.send(document);
  } catch (err) {
    console.log(err);
  }
};
