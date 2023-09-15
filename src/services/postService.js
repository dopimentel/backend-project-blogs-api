const { BlogPost, Category } = require('../models');

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id }
  });
  return post;
};

const create = async ({ title, content, categoryIds, userId }) => {
  console.log(userId);

  const { dataValues } = await BlogPost.create({ title, content, userId });
  // await post.addCategories(categoryIds);
  console.log(dataValues.id);
  const post = await getById(dataValues.id);
  console.log(post);
  return post;
};

module.exports = {
  create,
};
