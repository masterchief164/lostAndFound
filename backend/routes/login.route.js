const express = require('express');
const controller = require('../controllers/login.controller');

const router = express.Router();

router.post('/', controller.googleLogin);

module.exports = router;
