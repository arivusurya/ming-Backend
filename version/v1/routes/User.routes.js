const express = require("express");

const Usercontroller = require("../controller/User.controller");

const router = express.Router();

router.post("/login", Usercontroller.login);

router.post("/register", Usercontroller.Register);

module.exports = router;
