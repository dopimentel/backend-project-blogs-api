const { categoryService } = require('../services');

const create = async (req, res, next) => {
  const { name } = req.body;
  const response = await categoryService.create({ name });
  if (response.error) return next(response.error);
  res.status(response.status).json(response.category);
};

const getAll = async (req, res) => {
  const categories = await categoryService.getAll();
  res.status(200).json(categories);
};

module.exports = {
  create,
  getAll,
};