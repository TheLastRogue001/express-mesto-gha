const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('../consts/consts');
const {
  getUserById,
  getUsers,
  getUserSignIn,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(urlRegex)),
    email: Joi.string().email().required(),
  }),
}), getUsers);
router.get('/users/me', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(urlRegex)),
    email: Joi.string().email().required(),
  }),
}), getUserSignIn);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().required(),
  }),
}), getUserById);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUserInfo);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(new RegExp(urlRegex)),
  }),
}), updateUserAvatar);

module.exports = router;
