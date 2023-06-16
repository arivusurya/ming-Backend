const Joi = require("joi");
const logger = require("../logger/logger");

const UserBodyValidator = {};
// Registration Scheme
const RegistrationUserSchema = Joi.object({
  firstname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNum: Joi.string()
    .regex(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === "string.pattern.base") {
          err.message = "Please enter a valid Indian phone number";
        }
      });
      return errors;
    }),
});

UserBodyValidator.RegistrationValidator = (req, res, next) => {
  const { error } = RegistrationUserSchema.validate(req.body);
  if (error) {
    return res.status(500).json({ message: error.message });
  }
  next();
};

// Login User Schema
const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

UserBodyValidator.LoginValidator = (req, res, next) => {
  const { error } = LoginSchema.validate(req.body);
  if (error) {
    logger.error(error);
    return res.status(500).json({ message: error.message });
  }
  next();
};

module.exports = UserBodyValidator;
