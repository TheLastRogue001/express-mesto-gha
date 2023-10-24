const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { urlRegex } = require('../consts/consts');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: {
      value: false,
      message: 'Это поле обязательно к заполнению',
    },
    minlength: [2, 'Минимум 2 символа'],
    maxlength: [30, 'Максимум 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: {
      value: false,
      message: 'Это поле обязательно к заполнению',
    },
    minlength: [2, 'Минимум 2 символа'],
    maxlength: [30, 'Максимум 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    validate: {
      validator: (url) => urlRegex.test(url),
      message: 'Введи URL с картинкой',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: (props) => `${props.value} некорректное значение email`,
    },
  },
  password: {
    type: String,
    required: {
      value: true,
      message: 'Поле password обязательное для заполнения',
    },
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
