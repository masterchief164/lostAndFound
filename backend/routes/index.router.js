const express = require("express");
const loginRouter = require("./login.route");

const router = express.Router();

router.use("/googleLogin", loginRouter);

module.exports = router;