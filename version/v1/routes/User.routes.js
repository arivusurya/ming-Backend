const express = require("express");
const router = express.Router();

const { validateBody } = require("../middleware/validation.middleware");
const userValidation = require("../validations/user.validation");
const { validateUser } = require("../utils/auth.utils");

const userController = require("../controllers/user.controller");

router.post("/getAllUsers", userController.getAllUser);
router.post("/registerUser", validateBody(userValidation.registerUser), userController.registerUser);
router.post("/loginUser", validateBody(userValidation.loginUser), userController.loginUser);
router.post("/getSingleUser", validateBody(userValidation.getSingleUser), userController?.getSingleUser);

router.post("/addUserAddress", validateUser, validateBody(userValidation.addUserAddress), userController.addUserAddress);
router.post("/getAllAddress", validateUser, userController.getAllAddress);

module.exports = router;
