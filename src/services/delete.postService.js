const { BlogPost } = require('../models');
const { getById } = require('./postService');

const exclude = async ({ id, userId }) => {
  const post = await getById(id);
  if (!post) return { error: { status: 404, message: 'Post does not exist' } };
  const { dataValues } = post;
  if (userId !== Number(dataValues
    .userId)) return ({ error: { status: 401, message: 'Unauthorized user' } });
  await BlogPost.destroy({ where: { id } });
  return post;
};

module.exports = {
  exclude,
};