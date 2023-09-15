const express = require('express');
const { loginController, userController, categoryController } = require('./controllers');
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

app.use(error);

module.exports = app;
