const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { loginValidation } = require('./validations');

const { JWT_SECRET } = process.env;
const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

const createToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, jwtConfig);
  return token;
};

const login = async ({ email, password }) => {
  const error = loginValidation({ email, password });
  if (error) return { error };

  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
    return {
      status: 400,
      message: 'Invalid fields',
    };
  }

  const token = createToken({ email })
  
  return {
    status: 200,
    token,
  };
};

const create = async ({ displayName, email, password, image }) => {
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return {
      status: 409,
      message: 'User already registered',
    };
  }

  const user = await User.create({ displayName, email, password, image });
  const token = createToken({ email })

  return { status: 201, token }
};


module.exports = {
  createToken,
  login,
  create,
};