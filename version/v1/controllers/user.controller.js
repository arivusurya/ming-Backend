const handler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Address = require("../models/address.model");

const helperUtils = require("../utils/helperUtils");
const constantUtils = require("../utils/constant.utils");
const authUtils = require("../utils/auth.utils");
const structureUtils = require("../utils/structure.utils");

controller = {};

controller.getAllUser = handler(async (req, res) => {
  const user = await User.findOne({
    include: {
      model: Address,
      required: true,
    },
  });
  return res.json({
    message: "working",
    data: user,
  });
});

controller.registerUser = handler(async (req, res) => {
  const ifEmailExist = await User.findOne({
    where: {
      email: req?.body?.email,
    },
  });

  if (ifEmailExist) throw "400|Email_Already_Exist!";

  const userId = parseInt(helperUtils.generateRandomNumber(8));

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req?.body?.password, salt);
  const confirmPassword = await bcrypt.hash(req?.body?.confirmPassword, salt);
  const encryptMobileNumber = helperUtils.encrypt(req?.body?.phoneNumber);

  const phoneNumberCheck = await User.findOne({
    where: {
      phoneNumber: encryptMobileNumber,
    },
  });

  if (phoneNumberCheck) throw "400|Phone_Number_Already_Have_Account";

  const newUser = await User.create({
    userId: userId,
    firstName: req?.body?.firstName,
    lastName: req?.body?.lastName,
    userName: req?.body?.userName,
    email: req?.body?.email,
    phoneNumber: helperUtils.encrypt(req?.body?.phoneNumber),
    password: password,
    confirmPassword: confirmPassword,
    accessToken: authUtils.generateToken(userId),
  });

  if (!newUser) throw "400|No_User_Found!";

  return res.json({
    message: "success",
  });
});

controller.loginUser = handler(async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req?.body?.email,
    },
  });
  if (!user) throw "400|Wrong_Email!";

  const password = await bcrypt.compare(req?.body?.password, user?.password);
  if (!password) throw "400|Incorrect_Password";
  return res.json(user);
});

controller.getSingleUser = handler(async (req, res) => {
  const user = await User.findOne({
    where: {
      userId: req?.body?.userId,
      status: constantUtils.ACTIVE,
    },
  });

  return res.json(structureUtils.userStructure(user));
});

controller.addUserAddress = handler(async (req, res) => {
  const addressId = parseInt(helperUtils.generateRandomNumber(8));

  const user = await User.findOne({
    where: {
      userId: req?.user?.userId,
    },
  });

  if (!user) throw "400|User_Not_Found!";

  const addAddress = await Address.create({
    addressId: addressId,
    userId: req?.user?.userId,
    address: req?.body?.address,
    apartment: req?.body?.apartment,
    city: req?.body?.city,
    state: req?.body?.state,
    country: req?.body?.country,
    pinCode: req?.body?.pinCode,
    defaultStatus: req?.body?.defaultStatus,
  });

  if (!addAddress) throw "400|Somthing_Went_Wrong!";

  user.addressId = addressId;

  await user.save();

  return res.json({
    message: "success!",
  });
});

controller.getAllAddress = handler(async (req, res) => {
  const address = await Address.findAll({
    include: {
      model: User,
      required: true,
    },
  });
  return res.json(address);
});

module.exports = controller;
