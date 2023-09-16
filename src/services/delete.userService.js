const { User } = require('../models');
const { getById } = require('./userService');

const exclude = async ({ userId }) => {
  const user = await getById(userId);
  if (!user) return { error: { status: 404, message: 'User does not exist' } };
  await User.destroy({ where: { id: userId } });
  return user;
};

module.exports = {
  exclude,
};