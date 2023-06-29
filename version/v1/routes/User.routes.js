const express = require("express");
const router = express.Router();

const { validateBody } = require("../middleware/validation.middleware");
const userValidation = require("../validations/user.validation");
const { validateUser } = require("../utils/auth.utils");

const userController = require("../controllers/user.controller");

router.post("/getAllUsers", userController.getAllUser);
router.post("/registerUser", validateBody(userValidation.registerUser), userController.registerUser);
router.post("/loginUser", validateBody(userValidation.loginUser), userController.loginUser);
router.post("/googleAuth", userController.googleAuth);
router.post("/getSingleUser", validateBody(userValidation.getSingleUser), userController?.getSingleUser);

router.post("/addUserAddress", validateUser, validateBody(userValidation.addUserAddress), userController.addUserAddress);
router.post("/getAllAddress", validateUser, userController.getAllAddress);
router.post("/editUserDeatils", validateUser, userController.editUserDeatils);
router.post("/getUserAddress", validateUser, userController.getUserAddress);
router.post("/updateUserAddress", validateUser, userController.updateUserAddress);
router.post("/deleteUserAddress", validateUser, userController.deleteUserAddress);
router.post("/verifyEmailAddresss", userController.verifyEmailAddresss);
router.post("/resetPassword", validateBody(userValidation?.resetPassword), userController.resetPassword);
router.post("/getUserAddressById", userController.getUserAddressById);

module.exports = router;
