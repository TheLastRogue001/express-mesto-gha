const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');
const { JWT_SECRET, NODE_ENV } = require('../consts/consts');

module.exports = (req, res, next) => {
  let payload;
  try {
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.replace('Bearer ', '');
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
      req.user = payload;
      next();
    } else {
      next(new UnauthorizedError('Необходима авторизация!'));
    }
  } catch (error) {
    next(new UnauthorizedError('Необходима авторизация!'));
  }
};
