const userService = require('./userService');
const loginService = require('./loginService');
const categoryService = require('./categoryService');
const postService = require('./postService');
const updatePostService = require('./update.postService');
const deletePostService = require('./delete.postService');

module.exports = {
  userService,
  loginService,
  categoryService,
  postService,
  updatePostService,
  deletePostService,
};
