const { Category } = require('../models');
const { createCategoryValidation } = require('./validations');

const create = async ({ name }) => {
  const error = createCategoryValidation({ name });
  if (error) return { error };
  const category = await Category.create({ name });
  return { status: 201, category };
};

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  create,
  getAll,
};