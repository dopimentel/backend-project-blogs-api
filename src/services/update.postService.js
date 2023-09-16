const { User, BlogPost, Category, sequelize } = require('../models');
const { updatePostValidation } = require('./validations');

const update = async ({ id, title, content, userId }) => {
  const error = updatePostValidation({ title, content });
  if (error) return { error };
  if (userId !== Number(id)) return ({ error: { status: 401, message: 'Unauthorized user' } });
  const updatedPost = await sequelize.transaction(async (t) => {
    await BlogPost.update({ title, content }, { where: { id }, transaction: t });
    return BlogPost.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
      transaction: t });
  });
  return updatedPost;
};

module.exports = {
  update,
};
