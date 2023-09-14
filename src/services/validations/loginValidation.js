const { loginSchema } = require('../../utils/schemas');

const validateLogin = (body) => {
  const { error } = loginSchema.validate(body);
  console.log(error)
  return error 
}

module.exports = validateLogin;
