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

const getById = async (req, res, next) => {
  const { id } = req.params;
  const post = await postService.getById(id);
  if (!post) {
    const err = new Error('Post does not exist');
    err.status = 404;
    return next(err);
  }
  res.status(200).json(post);
};

module.exports = {
  create,
  getAll,
  getById,
};
