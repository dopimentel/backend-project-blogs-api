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
}

module.exports = {
  login,
};
