const Joi = require('joi');

const requiredMessage = 'Some required fields are missing';
const loginSchema = Joi.object({
  email: Joi.string().required()
    .messages({
      'string.empty': requiredMessage,
      'any.required': requiredMessage,
  }),
  password: Joi.string().required().messages({
    'string.empty': requiredMessage,
    'any.required': requiredMessage,
  }),
});

const createUserSchema = Joi.object({
  displayName: Joi.string().min(8).required()
    .messages({
      'string.empty': requiredMessage,
      'any.min': 'displayName must be at least 8 characters long',
      'any.required': requiredMessage,
  }),
  email: Joi.string().regex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i).required() /// regex [^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    .messages({
      'string.empty': requiredMessage,
      'string.pattern.base': '"email" must be a valid email',
      'any.required': requiredMessage,
  }),
  password: Joi.string().min(6).required()
    .messages({
      'string.empty': requiredMessage,
      'any.min': 'password must be at least 6 characters long',
      'any.required': requiredMessage,
  }),
  image: Joi.string(),

});

module.exports = {
  loginSchema,
  createUserSchema,
};
