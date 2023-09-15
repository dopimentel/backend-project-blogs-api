const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().required()
    .messages({
      'string.empty': 'Some required fields are missing',
      'any.required': 'Some required fields are missing',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Some required fields are missing',
    'any.required': 'Some required fields are missing',
  }),
});

const createUserSchema = Joi.object({
  displayName: Joi.string().min(8).required()
    .messages({
      'string.empty': 'Some required fields are missing',
      'any.min': 'displayName must be at least 8 characters long',
      'any.required': 'Some required fields are missing',
  }),
  email: Joi.string().regex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i).required() /// regex [^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    .messages({
      'string.empty': 'Some required fields are missing',
      'string.pattern.base': '"email" must be a valid email',
      'any.required': 'Some required fields are missing',
  }),
  password: Joi.string().min(6).required()
    .messages({
      'string.empty': 'Some required fields are missing',
      'any.min': 'password must be at least 6 characters long',
      'any.required': 'Some required fields are missing',
  }),
  image: Joi.string()

});

module.exports = {
  loginSchema,
  createUserSchema,
};
