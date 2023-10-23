const ERROR_VALIDATION = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_SERVER = 500;
const SALT_TIMES = 10;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CONFLICT = 11000;
const HTTP_STATUS_DENIED = 401;
const { JWT_SECRET, NODE_ENV } = process.env;
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

module.exports = {
  ERROR_VALIDATION,
  ERROR_NOT_FOUND,
  ERROR_SERVER,
  SALT_TIMES,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_CONFLICT,
  HTTP_STATUS_DENIED,
  HTTP_STATUS_OK,
  JWT_SECRET,
  NODE_ENV,
  urlRegex,
};
