const Joi = require("joi");

const validation = {};

validation.getProductByCategory = Joi.object().keys({
  categoryId: Joi.number().required(),
});

validation.getSingleProductById = Joi.object().keys({
  productId: Joi.number().required(),
});

module.exports = validation;
