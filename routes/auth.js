const router = require('express').Router();
const { celebrate } = require('celebrate');
const Joi = require('joi');
const {
  login,
  createUser,
} = require('../controllers/users');
const { urlRegex } = require('../consts/consts');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegex).uri({ scheme: ['http', 'https'] }),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

module.exports = router;
