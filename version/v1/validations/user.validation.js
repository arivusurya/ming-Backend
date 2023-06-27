const Joi = require("joi");

const validation = {};

validation.registerUser = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  userName: Joi.string().required(),
  email: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
});

validation.loginUser = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

validation.getSingleUser = Joi.object().keys({
  userId: Joi.number().required(),
});

validation.addUserAddress = Joi.object().keys({
  name: Joi.string().required(),
  address: Joi.string().required(),
  // apartment: Joi.string()
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  pinCode: Joi.number().required(),
  defaultStatus: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNumber: Joi.string().required(),
});

validation.resetPassword = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
});

module.exports = validation;
