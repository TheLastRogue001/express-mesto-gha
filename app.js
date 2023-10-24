/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const routerAuth = require('./routes/auth');
const auth = require('./middlewares/auth');
const { NotFoundError } = require('./errors/errors');
const { handleError } = require('./middlewares/handleError');

const {
  PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routerAuth);

app.use(auth);

app.use(routerUsers);
app.use(routerCards);

app.use((req, res, next) => next(new NotFoundError('Такой страницы не существует')));

app.use(errors());
app.use(handleError);

async function init() {
  await mongoose.connect(MONGO_URL);
  console.log('DB CONNECT');

  await app.listen(PORT);
  console.log(`Server listen on port ${PORT}`);
}

init();
