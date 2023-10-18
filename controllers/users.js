/* eslint-disable max-len */
const User = require('../models/User');
const {ERROR_VALIDATION, ERROR_NOT_FOUND, ERROR_SERVER} = require('../consts/consts');

const getUsers = (req, res) => {
  User.find({})
      .then((users) => {
        if (users)res.send({data: users});
      })
      .catch((err) => {
        if (err.name === 'ValidationError') return res.status(ERROR_VALIDATION).send({message: 'Переданы некорректные данные при получении пользователя'});
        return res.status(ERROR_SERVER).send({message: `Произошла ошибка: ${err.message}`});
      });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
      .then((user) => {
        if (!user) return res.status(ERROR_VALIDATION).send({message: 'Пользователь по указанному _id не найден'});
        res.send({data: user});
      })
      .catch((err) => {
        return res.status(ERROR_SERVER).send({message: `Произошла ошибка: ${err.message}`});
      });
};

const createUser = (req, res) => {
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
      .then((user) => {
        if (user) return res.send({data: user});
      })
      .catch((err) => {
        if (err.name === 'ValidationError') return res.status(ERROR_VALIDATION).send({message: 'Переданы некорректные данные при создании пользователя'});
        return res.status(ERROR_SERVER).send({message: `Произошла ошибка: ${err.message}`});
      });
};

const updateUserInfo = (req, res) => {
  const {name, about} = req.body;
  User.findByIdAndUpdate(req.user._id, {name, about}, {new: true, runValidators: true})
      .then((user) => {
        if (user) return res.send({data: user});
        return res.status(ERROR_NOT_FOUND).send({message: 'Пользователь с указанным _id не найден'});
      })
      .catch((err) => {
        if (err.name === 'ValidationError') return res.status(ERROR_VALIDATION).send({message: 'Переданы некорректные данные при обновлении профиля'});
        return res.status(ERROR_SERVER).send({message: `Произошла ошибка: ${err.message}`});
      });
};

const updateUserAvatar = (req, res) => {
  const {avatar} = req.body;
  User.findByIdAndUpdate(req.user._id, {avatar}, {new: true, runValidators: true})
      .then((user) => {
        if (user) return res.send({avatar});
        return res.status(ERROR_NOT_FOUND).send({message: 'Пользователь с указанным _id не найден'});
      })
      .catch((err) => {
        if (err.name === 'ValidationError') return res.status(ERROR_VALIDATION).send({message: 'Переданы некорректные данные при обновлении аватара'});
        return res.status(ERROR_SERVER).send({message: `Произошла ошибка: ${err.message}`});
      });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
