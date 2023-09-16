const { userService, deleteUserService } = require('../services');

const create = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const response = await userService.create({ displayName, email, password, image });
  if (response.error) return next(response.error);
  if (response.status === 409) {
    const err = new Error(response.message);
    err.status = response.status;
    return next(err);
  }

  res.status(response.status).json({ token: response.token });
};

const getAll = async (req, res) => {
  const users = await userService.getAll();
  res.status(200).json(users);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const user = await userService.getById(id);
  if (!user) {
    const err = new Error('User does not exist');
    err.status = 404;
    return next(err);
  }
  res.status(200).json(user);
};

const exclude = async (req, res, next) => {
  const response = await deleteUserService.exclude(req.body);
  if (response.error) return next(response.error);
  res.status(204).send();
};

module.exports = {
  create,
  getAll,
  getById,
  exclude,
};
