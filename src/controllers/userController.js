const { userService } = require('../services');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const response = await userService.login( { email, password });
  if (response.error) return next(response.error);
  if (response.status === 400) {
    const err = new Error(response.message);
    err.status = response.status;
    return next(err);
  }
  res.status(200).json({ token: response.token });
};

const create = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const response = await userService.create({ displayName, email, password, image });
  if (response.error) return next(response.error);
  if (response.status === 409) {
    const err = new Error(response.message);
    err.status = response.status;
    return next(err);
  }

  res.status(response.status).json({ token: response.token});
};

const getAll = async (req, res, next) => {
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

module.exports = {
  login,
  create,
  getAll,
  getById,
};
