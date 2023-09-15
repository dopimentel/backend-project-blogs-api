const { createCategorySchema } = require('../../utils/schemas');

const validateCreateCategory = (body) => {
  const { error } = createCategorySchema.validate(body);
  return error;
};

module.exports = validateCreateCategory;
