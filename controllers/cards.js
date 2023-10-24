/* eslint-disable max-len */
const Card = require('../models/Card');
const { HTTP_STATUS_OK } = require('../consts/consts');
const { ForbiddenError, BadRequestError, NotFoundError } = require('../errors/errors');

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError(
            `Переданы некорректные данные при создании карточки: ${err.message}`,
          ),
        );
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) { return next(new NotFoundError('Карточка по указанному _id не найдена')); }
      if (card.owner.toString() !== req.user._id) {
        return next(
          new ForbiddenError('Разрешено удалять только свои карточки'),
        );
      }
      return Card.findByIdAndDelete(cardId).then((deletedCard) => res.status(HTTP_STATUS_OK).send(deletedCard));
    })
    .catch((err) => {
      if (err.name === 'CastError') { return next(new BadRequestError('Передан некорректный _id карточки')); }
      return next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) return res.send({ data: card });
      return next(new NotFoundError('Передан несуществующий _id карточки'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new BadRequestError(
            'Переданы некорректные данные для постановки/снятии лайка',
          ),
        );
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) return res.send({ data: card });
      return next(new NotFoundError('Передан несуществующий _id карточки'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new BadRequestError(
            'Переданы некорректные данные для постановки/снятии лайка',
          ),
        );
      }
      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
