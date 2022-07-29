const express = require('express');
const controller = require('../controllers/user.controller');
const verify = require('../middleware/auth');

const router = express.Router();

router.post('/update', verify, controller.updateUserDetails);

module.exports = router;
