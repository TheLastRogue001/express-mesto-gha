/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  ERROR_VALIDATION,
  ERROR_NOT_FOUND,
  ERROR_SERVER,
  SALT_TIMES,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_CONFLICT,
  HTTP_STATUS_OK,
  NODE_ENV,
  JWT_SECRET,
  HTTP_STATUS_DENIED,
} = require('../consts/consts');

const generateToken = (payload) => jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });

const getUsers = (req, res) => {
  User.find({})
      .then((users) => res.send({data: users}))
      .catch((err) => res.status(ERROR_SERVER).send({message: `Произошла ошибка: ${err.message}`}));
};

const getUserSignIn = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
      .then((user) => {
        if (!user) return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
        res.send({data: user});
      })
      .catch((err) => {
        if (err.name === 'CastError') return res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные в поле _id' });
        return res.status(ERROR_SERVER).send({ message: `Произошла ошибка: ${err.message}` });
      });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
      .then((user) => {
        if (!user) return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
        res.send({data: user});
      })
      .catch((err) => {
        if (err.name === 'CastError') return res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные в поле _id' });
        return res.status(ERROR_SERVER).send({ message: `Произошла ошибка: ${err.message}` });
      });
};

const login = (req, res, next) => {
  const {email, password} = req.body;

  User.findOne({ email }).select('+password')
      .then((user) => {
        if (!user) return res.status(HTTP_STATUS_DENIED).send({ message: 'Неправильная почта или пароль' });
        return bcrypt.compare(password, user.password)
            .then((matched) => {
              if (!matched) return res.status(HTTP_STATUS_DENIED).send({ message: 'Неправильная почта или пароль' });
              const token = generateToken({ _id: user._id });
              res.cookie('jwt', token, {
                maxAge: 3600000 * 24 * 7,
                httpOnly: true,
                sameSite: true,
                secure: true,
              });
              res.status(HTTP_STATUS_OK).send({ _id: user._id, jwt: token});
            });
      })
      .catch((err) => {
        if (err.name === 'AuthFailed') return res.status(HTTP_STATUS_DENIED).send({ message: 'Неправильная почта или пароль' });
        return res.status(ERROR_SERVER).send({ message: `Произошла ошибка: ${err.message}` });
      });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, SALT_TIMES)
      .then((hash) => User.create({
        name, about, avatar, email, password: hash,
      }))
      .then((user) => {
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        res.status(HTTP_STATUS_CREATED).send(userWithoutPassword);
      })
      .catch((err) => {
        if (err.name === 'ValidationError') return res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные при создании пользователя' });
        if (err.code === HTTP_STATUS_CONFLICT) return res.status(409).json({message: 'Пользователь с таким email уже зарегестрирован'});
        return res.status(ERROR_SERVER).send({ message: `Произошла ошибка: ${err.message}` });
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
  User.findByIdAndUpdate(req.user._id, {avatar}, { new: true, runValidators: true })
      .then((user) => {
        if (user) return res.send({avatar});
        return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') return res.status(ERROR_VALIDATION).send({message: `Переданы некорректные данные при обновлении аватара: ${err.message}`});
        return res.status(ERROR_SERVER).send({ message: `Произошла ошибка: ${err.message}` });
      });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getUserSignIn,
};
