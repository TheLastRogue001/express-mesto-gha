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

router.get('/users', getUsers);
router.get('/users/me', getUserSignIn);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
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
