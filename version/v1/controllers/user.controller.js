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
    include: {
      model: Address,
      required: true,
    },
  });
  if (!user) throw "400|User_Not_Found!";

  const password = await bcrypt.compare(req?.body?.password, user?.password);
  if (!password) throw "400|Incorrect_Password";
  return res.json(structureUtils?.userStructure(user));
});

controller.getSingleUser = handler(async (req, res) => {
  const user = await User.findOne({
    where: {
      userId: req?.body?.userId,
      status: constantUtils.ACTIVE,
    },
    include: {
      model: Address,
      required: true,
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
    name: req?.body?.name,
    address: req?.body?.address,
    apartment: req?.body?.apartment,
    city: req?.body?.city,
    state: req?.body?.state,
    country: req?.body?.country,
    pinCode: req?.body?.pinCode,
    defaultStatus: req?.body?.defaultStatus,
    phoneNumber: helperUtils.encrypt(req?.body?.phoneNumber),
  });

  if (!addAddress) throw "400|Somthing_Went_Wrong!";

  user.addressId = addressId;
  user.firstName = req?.body?.firstName;
  user.lastName = req?.body?.lastName;

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

controller.editUserDeatils = handler(async (req, res) => {
  const encryptedPhoneNumber = helperUtils.encrypt(req?.body?.phoneNumber);

  const checkUser = await User.findOne({
    where: {
      userId: req?.user?.userId,
    },
  });

  if (!checkUser) throw "400|User_Not_Found!";

  const data = {
    ...req?.body,
    phoneNumber: encryptedPhoneNumber,
  };

  let mobile;

  if (checkUser?.phoneNumber !== data?.phoneNumber) {
    const findPhoneNumber = await User.findOne({
      where: {
        phoneNumber: encryptedPhoneNumber,
      },
    });

    mobile = findPhoneNumber;
  }

  if (mobile) throw "400|Mobile_Number_Exist!";

  const [numUpdated, updatedUser] = await User.update(data, {
    where: {
      userId: req?.user?.userId,
    },
  });

  // if (numUpdated < 1) throw "400|Somthing_Went_Wrong!";

  return res.json({
    message: "success",
  });
});

controller.getUserAddress = handler(async (req, res) => {
  const address = await Address.findAll({
    where: {
      userId: req?.user?.userId,
      status: constantUtils.ACTIVE,
    },
  });

  return res.json(
    address?.map((each) => structureUtils?.addressStructure(each))
  );
});

controller.updateUserAddress = handler(async (req, res) => {
  const encryptedPhoneNumber = helperUtils.encrypt(req?.body?.phoneNumber);

  const checkUser = await User.findOne({
    where: {
      userId: req?.user?.userId,
    },
  });

  if (!checkUser) throw "400|User_Not_Found!";

  const data = {
    ...req?.body,
    phoneNumber: encryptedPhoneNumber,
  };

  const [numUpdated, updatedUser] = await Address.update(data, {
    where: {
      userId: req?.user?.userId,
      addressId: req?.body?.addressId,
    },
  });

  if (numUpdated < 1) throw "400|Somthing_Went_Wrong!";

  return res.json({
    message: "success",
  });
});

controller.googleAuth = handler(async (req, res) => {
  if (!req?.body?.email) throw "400|Email_Required!";
  if (!req?.body?.userName) throw "400|UserName_Required!";

  let loginUser;

  const user = await User.findOne({
    where: {
      email: req?.body?.email,
    },
  });

  if (!user) {
    const userId = parseInt(helperUtils.generateRandomNumber(8));
    const newUser = await User.create({
      userId: userId,
      email: req?.body?.email,
      userName: req?.body?.userName,
      accessToken: authUtils.generateToken(userId),
    });
    loginUser = newUser;
  } else {
    loginUser = user;
  }

  return res.json(structureUtils.userStructure(loginUser));
});

controller.deleteUserAddress = handler(async (req, res) => {
  if (!req?.body?.addressId) throw "400|Address_Id_Required!";
  const address = await Address.findOne({
    where: {
      addressId: req?.body?.addressId,
      status: constantUtils.ACTIVE,
    },
  });
  if (!address) throw "400|Address_Not_Found!";
  address.status = constantUtils.INACTIVE;

  await address.save();

  return res.json({
    message: "success",
  });
});

controller.verifyEmailAddresss = handler(async (req, res) => {
  if (!req?.body?.email) throw "400|Email_Required!";
  const email = await User.findOne({
    where: {
      email: req?.body?.email,
    },
  });

  if (!email) throw "400|Email_Not_Found!";
  return res.json({
    message: "success",
    email: email?.email,
  });
});

controller.resetPassword = handler(async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req?.body?.password, salt);
  const confirmPassword = await bcrypt.hash(req?.body?.confirmPassword, salt);

  const checkEmail = await User.findOne({
    where: {
      email: req?.body?.email,
    },
  });

  if (!checkEmail) throw "400|Somthing_Went_Wrong_Try_Again!";

  checkEmail.password = password;
  checkEmail.confirmPassword = confirmPassword;

  await checkEmail.save();

  return res.json({
    message: "success",
  });
});

controller.getUserAddressById = handler(async (req, res) => {
  if (!req?.body?.userId) throw "400|User_Id_Required!";
  if (!req?.body?.addressId) throw "400|Address_Id_Required!";

  const user = await User.findOne({
    where: {
      userId: req?.body?.userId,
      addressId: req?.body?.addressId,
    },
    include: {
      model: Address,
      required: true,
    },
  });

  if (!user) throw "400|User_Not_Found!";

  let address;

  if (user?.addresss?.status === "ACTIVE") address = user?.addresss;

  if (user?.addresss?.status === "INACTIVE") address = {};

  return res.json(structureUtils.addressStructure(address));
  // return res.json(address);
});

module.exports = controller;
