const { updatePostSchema } = require('../../utils/updateSchemas');

const validateUpdatePost = (body) => {
  const { error } = updatePostSchema.validate(body);
  return error;
};

module.exports = validateUpdatePost;