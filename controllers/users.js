/* eslint-disable max-len */
const User = require('../models/User');

const getUsers = (req, res) => {
  User.find({})
      .then((users) => res.send({data: users}))
      .catch((err) => res.status(500).send({message: `Произошла ошибка: ${err.message}`}));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
      .then((user) => res.send({data: user}))
      .catch((err) => res.status(500).send({message: `Произошла ошибка: ${err.message}`}));
};

const createUser = (req, res) => {
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
      .then((user) => res.send({data: user}))
      .catch((err) => res.status(500).send({message: `Произошла ошибка: ${err.message}`}));
};

const updateUserInfo = (req, res) => {
  User.put({})
      .then((user) => res.send({data: user}))
      .catch((err) => res.status(500).send({message: `Произошла ошибка: ${err.message}`}));
};

const updateUserAvatar = (req, res) => {
  User.put({})
      .then((user) => res.send({data: user}))
      .catch((err) => res.status(500).send({message: `Произошла ошибка: ${err.message}`}));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
