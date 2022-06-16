const express = require('express');
const controller = require('../controllers/login.controller');
const verify = require('../middleware/auth.js');

const router = express.Router();

router.post('/googleLogin', controller.googleLogin);
router.get('/logout', verify, controller.logout);

module.exports = router;
