/* eslint-disable max-classes-per-file */
const {
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_CONFLICT,
  ERROR_NOT_FOUND,
  ERROR_VALIDATION,
  HTTP_STATUS_DENIED,
} = require('../consts/consts');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = HTTP_STATUS_DENIED;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = HTTP_STATUS_FORBIDDEN;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = ERROR_NOT_FOUND;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = ERROR_VALIDATION;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = HTTP_STATUS_CONFLICT;
  }
}

module.exports = {
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
  ForbiddenError,
  ConflictError,
};
