/* eslint-disable max-len */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const {
  ERROR_SERVER, HTTP_STATUS_DENIED, JWT_SECRET, NODE_ENV,
} = require('../consts/consts');

const handleAuthError = (res) => res.status(HTTP_STATUS_DENIED).send({ message: 'Необходима авторизация' });


const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    if (!token) {
      return handleAuthError(res);
    }
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    if (err.name === 'JsonWebTokenError') return res.status(HTTP_STATUS_DENIED).send({ message: 'С токеном что-то не так' });
    if (err.name === 'NotAuthantificate') return handleAuthError(res);
    return res.status(ERROR_SERVER).send({ message: `Произошла ошибка: ${err.message}` });
  }

  req.user = payload;
  next();
};
