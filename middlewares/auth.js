/* eslint-disable max-len */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('unauthorized');
const {
  JWT_SECRET, NODE_ENV,
} = require('../consts/consts');


module.exports = (req, res, next) => {
  let payload;
  try {
    const { authorization } = req.headers;
    const { cookies } = req;

    if ((authorization && authorization.startsWith('Bearer ')) || (cookies && cookies.jwt)) {
      const token = authorization ? authorization.replace('Bearer ', '') : cookies.jwt;
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
      req.user = payload;
      res.clearCookie('jwt');
      next();
    } else {
      next(new UnauthorizedError('Неверные авторизационные данные'));
    }
  } catch (error) {
    next(new UnauthorizedError('Неверные авторизационные данные'));
  }
};
