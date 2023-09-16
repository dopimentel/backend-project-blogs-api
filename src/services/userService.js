const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { createUserValidation } = require('./validations');

const { JWT_SECRET } = process.env;
const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

const createToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, jwtConfig);
  return token;
};

const findByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const create = async ({ displayName, email, password, image }) => {
  const error = createUserValidation({ displayName, email, password });
  if (error) return { error };
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return {
      status: 409,
      message: 'User already registered',
    };
  }
  await User.create({ displayName, email, password, image });
  const token = createToken({ email });
  return { status: 201, token };
};

const getAll = async () => {
  const users = await User.findAll(
    { attributes: { exclude: ['password'] } },
  );
  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(
    id,
    { attributes: { exclude: ['password'] } },
  );
  return user;
};

module.exports = {
  createToken,
  findByEmail,
  create,
  getAll,
  getById,
};