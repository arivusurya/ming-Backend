const Joi = require("joi");

const validation = {};

validation.getProductByCategory = Joi.object().keys({
  categoryId: Joi.number().required(),
});

validation.getSingleProductById = Joi.object().keys({
  productId: Joi.number().required(),
});

validation.userFeedback = Joi.object().keys({
  userName: Joi.string().required(),
  email: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
});

module.exports = validation;
