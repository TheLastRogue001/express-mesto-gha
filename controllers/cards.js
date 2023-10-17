/* eslint-disable max-len */
const Card = require('../models/Card');

const getCards = (req, res) => {
  Card.find({})
      .then((card) => res.send({data: card}))
      .catch((err) => res.status(500).send({message: `Произошла ошибка: ${err.message}`}));
};

const createCard = (req, res) => {
  const {name, link} = req.body;
  Card.create({name, link, owner: req.user._id})
      .then((card) => res.send({data: card}))
      .catch((err) => res.status(500).send({message: `Произошла ошибка: ${err.message}`}));
};

const deleteCard = (req, res) => {

};

const likeCard = (req, res) => {

};

const dislikeCard = (req, res) => {

};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
