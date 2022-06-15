const express = require("express");
const controller = require("../controllers/login.controller");


const router = express.Router();

router.post("/googleLogin", controller.googleLogin);

module.exports = router;