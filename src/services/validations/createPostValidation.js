const { createPostSchema } = require('../../utils/schemas');

const validateCreatePost = (body) => {
  const { error } = createPostSchema.validate(body);
  return error;
};

module.exports = validateCreatePost;
