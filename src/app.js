const express = require('express');
const { 
  loginController, userController, categoryController, postController } = require('./controllers');
const { error, auth } = require('./middlewares');

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

app.use(error);

module.exports = app;
