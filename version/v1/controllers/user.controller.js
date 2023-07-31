const handler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Address = require("../models/address.model");
const Token = require("../models/token.model");

const helperUtils = require("../utils/helperUtils");
const constantUtils = require("../utils/constant.utils");
const authUtils = require("../utils/auth.utils");
const structureUtils = require("../utils/structure.utils");
const emailUtils = require("../utils/email.utils");

const decodeJWT = require("jwt-decode");
const { nanoid } = require("nanoid");

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
    userName: req?.body?.userName,
    email: req?.body?.email,
    phoneNumber: helperUtils.encrypt(req?.body?.phoneNumber),
    password: password,
    confirmPassword: confirmPassword,
    accessToken: authUtils.generateToken(userId),
  });

  if (!newUser) throw "400|Somthing_Went_Wrong!";

  const id = nanoid(12);

  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt?.getMinutes() + 5);

  const token = await Token.create({
    userId: newUser.userId,
    token: id,
    expiresAt: expiresAt,
  });

  console.log(JSON.stringify(token, null, 4));

  const url = `${process.env.BASE_URL}?userId=${encodeURIComponent(
    newUser?.userId
  )}&token=${encodeURIComponent(token.token)}`;

  await emailUtils?.sendEmail(
    newUser?.email,
    "Verify Your Email Through Below Link",
    url
  );

  return res.json({
    message: "An Email Sent To Your Registered Email And Please Verify...",
  });
});

controller.verifyUserEmail = handler(async (req, res) => {
  try {
    console.log(req?.params);
    const user = await User.findOne({
      where: {
        userId: req?.body?.userId,
        status: constantUtils.ACTIVE,
      },
    });
    if (!user) throw "400|Invalid_Link!";

    const token = await Token.findOne({
      where: {
        userId: user?.userId,
        token: req?.body?.token,
      },
    });
    if (!token) throw "400|Invalid_Token!";

    const updateUser = await User.update(
      { verified: true },
      {
        where: {
          userId: user?.userId,
        },
      }
    );
    await token.destroy();

    return res.json({
      message: "Email Verified Successfully!",
    });
  } catch (error) {
    console.log(error);
  }
});

controller.loginUser = handler(async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req?.body?.email,
      verified: true,
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

      verified: true,
    },
  });

  if (!user) throw "400|User_Not_Found!";

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

  const exitAddress = await Address.findOne({
    where: {
      userId: req?.user?.userId,
      address: req?.body?.address,
      apartment: req?.body?.apartment,
      city: req?.body?.city,
      state: req?.body?.state,
      country: req?.body?.country,
      pinCode: req?.body?.pinCode,
    },
  });

  if (exitAddress) throw "400|Address_Already_Exist!";
  const addAddress = await Address.create({
    addressId: addressId,
    userId: req?.user?.userId,
    contact: user?.email,
    firstName: req?.body?.firstName,
    lastName: req?.body?.lastName,
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

  await user.save();

  return res.json({
    message: "success!",
    Address: structureUtils.addressStructure(addAddress),
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

  if (numUpdated < 1) throw "400|Somthing_Went_Wrong!";

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

controller.getUserById = handler(async (req, res) => {
  const user = await User.findOne({
    where: {
      userId: req?.user?.userId,
    },
  });

  return res.json(structureUtils?.userStructure(user));
});

controller.updateUserAddress = handler(async (req, res) => {
  const encryptedPhoneNumber = helperUtils.encrypt(req?.body?.phoneNumber);
  console.log(req?.body);
  const checkUser = await User.findOne({
    where: {
      userId: req?.user?.userId,
    },
  });

  if (!checkUser) throw "400|User_Not_Found!";

  const exitAddress = await Address.findOne({
    where: {
      userId: req?.user?.userId,
      address: req?.body?.address,
      apartment: req?.body?.apartment,
      city: req?.body?.city,
      state: req?.body?.state,
      pinCode: req?.body?.pinCode,
    },
  });
  const updateAdd = await Address.findOne({
    where: {
      addressId: req?.body?.addressId,
    },
  });

  if (exitAddress.addressId !== updateAdd.addressId)
    throw "400|Address_already_exist";

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

  if (numUpdated < 1) throw "400|No_changes!";

  return res.json({
    message: "success",
  });
});

controller.googleAuth = handler(async (req, res) => {
  if (!req?.body?.res?.credential) throw "400|Invalid_Value!";
  const userDetails = decodeJWT(req?.body?.res?.credential);

  let loginUser;

  const user = await User.findOne({
    where: {
      email: userDetails?.email,
    },
  });

  if (!user) {
    const userId = parseInt(helperUtils.generateRandomNumber(8));
    const newUser = await User.create({
      userId: userId,
      email: userDetails?.email,
      userName: userDetails?.given_name,
      accessToken: authUtils.generateToken(userId),
      verified: true,
    });
    loginUser = newUser;
    console.log(`new user`);
  } else {
    loginUser = user;
    console.log(`exist user`);
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
  // await address.destroy();

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



// controller.resetPassword = handler(async (req, res) => {
//   if (!req?.body?.password) throw "400|Pasword_Required!";
//   if (!req?.body?.confirmPassword) throw "400|Confirm_Password_Required!";
//   if (!req?.body?.userId) throw "400|User_Id_Required!";
//   if (!req?.body?.token) throw "400|Token_Required!";

//   const user = await User.findOne({
//     where: {
//       userId: req?.body?.userId,
//     },
//   });

//   if (!user) throw "400|Invalid_Token!";

//   const token = await Token.findOne({
//     where: {
//       token: req?.body?.token,
//     },
//   });

//   if (!token) throw "400|Invalid_Token!";

//   const salt = await bcrypt.genSalt(10);
//   const password = await bcrypt.hash(req?.body?.password, salt);
//   const confirmPassword = await bcrypt.hash(req?.body?.confirmPassword, salt);

//   const updateUser = await User.update(
//     { password: password, confirmPassword: confirmPassword },
//     {
//       where: {
//         userId: user?.userId,
//       },
//     }
//   );

//   if (!updateUser) throw "400|Somthing_Went_Wrong!";

//   await token.destroy();

//   return res.json({
//     message: "Password Reset Successfully!",
//   });
// });

// controller.verifyPassEmail = handler(async (req, res) => {
//   if (!req?.body?.email) throw "400|Email_Required!";

//   const ifEmailExist = await User.findOne({
//     where: {
//       email: req?.body?.email,
//     },
//   });
//   if (!ifEmailExist) throw "400|User_Not_Found!";

//   const id = nanoid();

//   console.log(id);

//   const expiresAt = new Date();
//   expiresAt.setMinutes(expiresAt?.getMinutes() + 5);

//   const token = await Token.create({
//     userId: ifEmailExist?.userId,
//     token: id,
//     expiresAt: expiresAt,
//   });

//   console.log(JSON.stringify(token, null, 4));

//   const url = `${process.env.BASE_PASS_URL}?${ifEmailExist?.userId}&${token?.token}`;

//   console.log(url);

//   await emailUtils?.resetPassword(
//     ifEmailExist?.email,
//     "Reset Your Password Through The Below Link",
//     url
//   );

//   return res.json({
//     message: "An Email Sent To Your Email And Please Verify...",
//   });
// });

module.exports = controller;
