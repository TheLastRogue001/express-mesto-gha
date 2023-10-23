/* eslint-disable new-cap */
const router = require('express').Router();
const {
  getUserById,
  getUsers,
  getUserSignIn,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUserSignIn);
router.get('/users/:userId', getUserById);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
