const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().min(1).required()
    .messages({
      'string.min': 'Some required fields are missing',
      'string.required': 'Some required fields are missing',
      // 'string.alphanum': '"username" must only contain alpha-numeric characters',
  }),
  password: Joi.string().min(1).required().messages({
    'string.min': 'Some required fields are missing',
    'string.required': 'Some required fields are missing',
  }),
});

module.exports = {
  loginSchema,
};
