const { postService } = require('../services');

const create = async (req, res, next) => {
  const { title, content, categoryIds, userId } = req.body;
  const response = await postService.create({ title, content, categoryIds, userId });
  if (response.error) return next(response.error);
  res.status(201).json(response);
};

const getAll = async (req, res) => {
  const posts = await postService.getAll();
  res.status(200).json(posts);
};

module.exports = {
  create,
  getAll,
};
