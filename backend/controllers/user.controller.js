const { createTokenProfile } = require('../services/auth.service');
const { decodeToken } = require('../services/user.service');
const User = require('../models/user.model').userModel;

const updateUserDetails = async (req, res) => {
  const result = await User.findOneAndUpdate({ email: req.user.email }, {
    given_name: req.body.firstName,
    family_name: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    batch: req.body.batch,
    hallNumber: req.body.hallNumber,
    roomNumber: req.body.roomNumber,
  }, { new: true });
  const token = await createTokenProfile(result);
  const userData = decodeToken(token);
  userData.exp = new Date(Date.now() + 1800000);
  res.cookie('token', token, {
    expires: new Date(Date.now() + 1800000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
    .status(200)
    .send({ userData });
};

module.exports = { updateUserDetails };
