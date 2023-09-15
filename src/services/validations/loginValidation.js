const { loginSchema } = require('../../utils/schemas');

const validateLogin = (body) => {
  const { error } = loginSchema.validate(body);
  return error;
};

module.exports = validateLogin;
