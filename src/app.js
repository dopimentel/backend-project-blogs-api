const express = require('express');
const { userController } = require('./controllers');
const { error, auth } = require('./middlewares');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', userController.login);
app.post('/user', userController.create);
app.get('/user', auth,  userController.getAll);
app.get('/user/:id', auth, userController.getById);

app.use(error);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
