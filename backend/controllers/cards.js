const Card = require('../models/card');

const ForbiddenError = require('../errors/ForbiddenError');
const InternalServerError = require('../errors/InternalServerError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (e) {
    next(new InternalServerError('Ошибка по умолчанию.'));
  }
};

const createCard = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner });
    res.status(201).send(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
    } else {
      next(new InternalServerError('Ошибка по умолчанию.'));
    }
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const userId = req.user._id;
    const card = await Card.findById(cardId);
    if (!card) {
      return next(new NotFoundError('Карточка с указанным _id не найдена.'));
    }
    if (userId !== card.owner.toString()) {
      return next(new ForbiddenError('Попытка удалить чужую карточку.'));
    }
    const cardDelete = await Card.findByIdAndRemove(cardId);
    return res.send(cardDelete);
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
    } return next(new InternalServerError('Ошибка по умолчанию.'));
  }
};

const likeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;

    const cardL = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!cardL) {
      return next(new NotFoundError('Карточка с указанным _id не найдена.'));
    }

    return res.send(cardL);
  } catch (e) {
    if (e.name === 'ValidationError' || e.name === 'CastError') {
      return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
    } return next(new InternalServerError('Ошибка по умолчанию.'));
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!card) {
      return next(new NotFoundError('Карточка с указанным _id не найдена.'));
    }
    return res.send(card);
  } catch (e) {
    if (e.name === 'ValidationError' || e.name === 'CastError') {
      return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
    } return next(new InternalServerError('Ошибка по умолчанию.'));
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
