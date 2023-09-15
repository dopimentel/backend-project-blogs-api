const { BlogPost, Category, PostCategory } = require('../models');
const { createPostValidation } = require('./validations');

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
  });
  return post;
};

const verifyCategories = async (categoryIds) => {
  const { count } = await Category.findAndCountAll({
    where: { id: categoryIds },
  });
  if (count !== categoryIds.length) {
    return { error: { status: 400, message: 'one or more "categoryIds" not found' } };
  }
};

const savePostsCategories = async (postId, categoryIds) => {
  const postCategoriesList = categoryIds.map((categoryId) => ({ postId, categoryId }));
  await PostCategory.bulkCreate(postCategoriesList);
};

const create = async ({ title, content, categoryIds, userId }) => {
  const errorJoi = createPostValidation({ title, content, categoryIds });
  if (errorJoi) return { error: { status: 400, message: errorJoi.details[0].message } };
  const error = await verifyCategories(categoryIds);
  if (error) return error;
  const { dataValues } = await BlogPost.create({ title, content, userId });
  await savePostsCategories(dataValues.id, categoryIds);
  const post = await getById(dataValues.id);
  return post;
};

module.exports = {
  create,
};
