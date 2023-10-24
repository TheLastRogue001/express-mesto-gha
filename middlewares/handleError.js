const { ERROR_SERVER } = require('../consts/consts');

const handleError = (err, req, res, next) => {
  const statusCode = err.statusCode || ERROR_SERVER;
  const message = statusCode === ERROR_SERVER ? 'На сервере произошла ошибка' : err.message;

  res.status(statusCode).send({ message });
  next();
};

module.exports = {
  handleError,
};
