const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: {
      value: true,
      message: 'Это поле обязательно к заполнению',
    },
    minlength: [2, 'Минимум 2 символа'],
    maxlength: [30, 'Максимум 30 символов'],
  },
  about: {
    type: String,
    required: {
      value: true,
      message: 'Это поле обязательно к заполнению',
    },
    minlength: [2, 'Минимум 2 символа'],
    maxlength: [30, 'Максимум 30 символов'],
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (url) => /^(ftp|http|https):\/\/[^ "]+$/.test(url),
      message: 'Введи URL с картинкой',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
