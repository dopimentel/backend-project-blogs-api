const { loginSchema } = require('../../utils/schemas');

const validateLogin = (req, _res, next) => {
  const { error } = loginSchema.validate(req.body);
  return error 
}

module.exports = validateLogin;
