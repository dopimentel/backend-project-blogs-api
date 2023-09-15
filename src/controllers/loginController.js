const { loginService } = require('../services');

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const response = await loginService( { email, password });
  if (response.error) return next(response.error);
  if (response.status === 400) {
    const err = new Error(response.message);
    err.status = response.status;
    return next(err);
  }
  res.status(200).json({ token: response.token });
};

module.exports = loginController