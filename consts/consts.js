/* eslint-disable no-useless-escape */
const ERROR_VALIDATION = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_SERVER = 500;
const SALT_TIMES = 10;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CONFLICT = 409;
const HTTP_STATUS_DENIED = 401;
const HTTP_STATUS_FORBIDDEN = 403;
const DB_DUBLICATE_ERROR_CODE = 11000;
const { JWT_SECRET, NODE_ENV } = process.env;
const urlRegex = /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/;

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
  HTTP_STATUS_FORBIDDEN,
  DB_DUBLICATE_ERROR_CODE,
  urlRegex,
};
