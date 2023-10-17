/* eslint-disable new-cap */
const router = require('express').Router();
const {
  getUserById,
  getUsers,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.post('/users', createUser);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
