const { BlogPost, Category, PostCategory, sequelize } = require('../models');
const { createPostValidation } = require('./validations');

const verifyCategories = async (categoryIds) => {
  const { count } = await Category.findAndCountAll({
    where: { id: categoryIds },
  });
  if (count !== categoryIds.length) {
    return { error: { status: 400, message: 'one or more "categoryIds" not found' } };
  }
};

const create = async ({ title, content, categoryIds, userId }) => {
  const error = createPostValidation({ title, content, categoryIds });
  if (error) return { error };
  const categoryNotFound = await verifyCategories(categoryIds);
  if (categoryNotFound) return categoryNotFound;
  const result = await sequelize.transaction(async (t) => {
    const { dataValues } = await BlogPost.create({ title, content, userId }, { transaction: t });
    const postCategoriesList = categoryIds
      .map((categoryId) => ({ postId: dataValues.id, categoryId }));
    await PostCategory.bulkCreate(postCategoriesList, { transaction: t });
    return BlogPost.findOne({ where: { id: dataValues.id }, transaction: t });
  });
  return result;
};

module.exports = {
  create,
};
