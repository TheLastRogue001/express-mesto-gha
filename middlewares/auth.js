/* eslint-disable max-len */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const {
  JWT_SECRET, NODE_ENV, HTTP_STATUS_DENIED,
} = require('../consts/consts');

const handleAuthError = (res) => res.status(HTTP_STATUS_DENIED).send({ message: 'Необходима авторизация' });

module.exports = (req, res, next) => {
  let payload;
  try {
    const { authorization } = req.headers;
    const { cookies } = req;

    if ((authorization && authorization.startsWith('Bearer ')) || (cookies && cookies.jwt)) {
      const token = authorization ? authorization.replace('Bearer ', '') : cookies.jwt;
      if (!token) return handleAuthError(res);
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
      req.user = payload;
      next();
    } else {
      return handleAuthError(res);
    }
  } catch (error) {
    return handleAuthError(res);
  }
};
