const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { loginValidation } = require('./validations');

const { JWT_SECRET } = process.env;
const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

const login = async ({ email, password }) => {
  console.log('email', email);
  console.log('password', password);
  const error = loginValidation({ email, password });
  if (error) return { error };

  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
    return {
      status: 400,
      message: 'Invalid fields',
    };
  }

  const token = jwt.sign({ email }, JWT_SECRET, jwtConfig);
  
  return {
    status: 200,
    token,
  };
};


module.exports = {
  login,
};