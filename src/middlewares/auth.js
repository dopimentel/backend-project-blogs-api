const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const extractToken = (authorization) => authorization.split(' ')[1];

const auth = (req, _res, next) => {
  const authorization = req.header('Authorization');
  console.log(authorization);
  if (!authorization) {
    const err = new Error('Token not found');
    err.status = 401;
    return next(err);
  }
  try {
    const token = extractToken(authorization);
    const { id } = jwt.verify(token, JWT_SECRET);
    req.body.userId = id;
    next();
  } catch (err) {
    const newErr = new Error('Expired or invalid token');
    newErr.status = 401;
    return next(newErr);
  }
};

module.exports = auth;