const mongoose = require('mongoose');
const User = require('./User');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => /^(ftp|http|https):\/\/[^ "]+$/.test(url),
      message: 'Введи URL с картинкой',
    },
  },
  owner: {
    ref: User,
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    ref: User,
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
