/* eslint-disable object-curly-spacing */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Card = require('../models/Card');
const {
  ERROR_VALIDATION, ERROR_NOT_FOUND, ERROR_SERVER, HTTP_STATUS_FORBIDDEN,
} = require('../consts/consts');

const getCards = (req, res) => {
  Card.find({})
      .then((card) => res.send({data: card}))
      .catch((err) => res.status(ERROR_SERVER).send({message: `Произошла ошибка: ${err.message}`}));
};

const createCard = (req, res) => {
  const {name, link} = req.body;
  Card.create({name, link, owner: req.user._id})
      .then((card) => res.send({data: card}))
      .catch((err) => {
        if (err.name === 'ValidationError') return res.status(ERROR_VALIDATION).send({message: `Переданы некорректные данные при создании карточки: ${err.message}`});
        return res.status(ERROR_SERVER).send({message: `Произошла ошибка: ${err.message}`});
      });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        if (card.owner.toString() !== req.user._id) {
          return res.status(HTTP_STATUS_FORBIDDEN).send({message: 'Разрешено удалять только свои карточки'});
        }
        if (!card) return res.status(ERROR_NOT_FOUND).send({message: 'Карточка по указанному _id не найдена'});
        return res.send({data: card});
      })
      .catch((err) => {
        if (err.name === 'CastError') return res.status(ERROR_VALIDATION).send({message: 'Передан некорректный _id карточки'});
        return res.status(ERROR_SERVER).send({message: `Произошла ошибка: ${err.message}`});
      });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
      req.params.cardId,
      {$addToSet: {likes: req.user._id}},
      {new: true},
  )
      .then((card) => {
        if (card) return res.send({data: card});
        return res.status(ERROR_NOT_FOUND).send({message: 'Передан несуществующий _id карточки'});
      })
      .catch((err) => {
        if (err.name === 'CastError') return res.status(ERROR_VALIDATION).send({message: 'Переданы некорректные данные для постановки/снятии лайка'});
        return res.status(ERROR_SERVER).send({message: `Произошла ошибка: ${err.message}`});
      });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
      req.params.cardId,
      {$pull: {likes: req.user._id}},
      {new: true},
  )
      .then((card) => {
        if (card) return res.send({data: card});
        return res.status(ERROR_NOT_FOUND).send({message: 'Передан несуществующий _id карточки'});
      })
      .catch((err) => {
        if (err.name === 'CastError') return res.status(ERROR_VALIDATION).send({message: 'Переданы некорректные данные для постановки/снятии лайка'});
        return res.status(ERROR_SERVER).send({message: `Произошла ошибка: ${err.message}`});
      });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
