/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const {ERROR_NOT_FOUND} = require('./consts/consts');

const {PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb'} = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  req.user = {
    _id: '652ef0d44b1ec1a99582c6fc',
  };

  next();
});

app.use(routerUsers);
app.use(routerCards);
app.use((req, res, next) => {
  res.status(ERROR_NOT_FOUND).json({
    message: 'Такой страницы не существует',
  });
});

async function init() {
  await mongoose.connect(MONGO_URL);
  console.log('DB CONNECT');

  await app.listen(PORT);
  console.log(`Server listen on port ${PORT}`);
}

init();
