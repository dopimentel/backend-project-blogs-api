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
app.post('/post', auth, async (req, res) => {
  const { title, content, categoryIds, userId } = req.body;
  res.status(200).json({ title, content, categoryIds, userId });
});


app.use(error);

module.exports = app;
