const express = require('express');
const { 
  loginController, userController, categoryController, postController } = require('./controllers');
const { error, auth } = require('./middlewares');
// const { postService } = require('./services');
const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', loginController);
app.post('/user', userController.create);
app.get('/user', auth, userController.getAll);
app.get('/user/:id', auth, userController.getById);
app.post('/categories', auth, categoryController.create);
app.get('/categories', auth, categoryController.getAll);
app.post('/post', auth, postController.create);
app.get('/post', auth, postController.getAll);
app.get('/post/:id', auth, postController.getById);
app.put('/post/:id', auth, postController.update);
app.delete('/post/:id', auth, postController.exclude);
app.delete('/user/me', auth, userController.exclude);

app.use(error);

module.exports = app;
