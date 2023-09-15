const { createUserSchema } = require('../../utils/schemas');

const validateCreateUser = (body) => {
  const { error } = createUserSchema.validate(body);
  return error;
};

module.exports = validateCreateUser;
