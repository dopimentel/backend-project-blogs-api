const userService = require('./userService');
const loginService = require('./loginService');
const categoryService = require('./categoryService');
const postService = require('./postService');
const updatePostService = require('./update.postService');
const deletePostService = require('./delete.postService');
const deleteUserService = require('./delete.userService');

module.exports = {
  userService,
  loginService,
  categoryService,
  postService,
  updatePostService,
  deletePostService,
  deleteUserService,
};
