const { loginValidation } = require('./validations');
const { findByEmail, createToken } = require('./userService');

const loginService = async ({ email, password }) => {
  const error = loginValidation({ email, password });
  if (error) return { error };

  const user = await findByEmail(email);
  if (!user || user.password !== password) {
    return {
      status: 400,
      message: 'Invalid fields',
    };
  }

  const token = createToken({ email });
  
  return {
    status: 200,
    token,
  };
};

module.exports = loginService