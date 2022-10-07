const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');

const createUser = async (req, res, next) => {
  try {
    const {
      name,
      about,
      avatar,
      email,
      password,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hashedPassword,
    });
    return res.send(user);
  } catch (e) {
    if (e.code === 11000) {
      return next(new ConflictError('Данный email уже существует.'));
    }
    if (e.name === 'ValidationError') {
      return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
    } return next(new InternalServerError('Ошибка по умолчанию.'));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new UnauthorizedError('Неправильные почта или пароль'));
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return next(new UnauthorizedError('Неправильные почта или пароль'));
    }

    const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
    res.cookie('jwt', token, { httpOnly: true, sameSite: true });

    return res.send(user.toJSON());
  } catch (e) {
    return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    next(new InternalServerError('Ошибка по умолчанию.'));
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return next(new NotFoundError('Пользователь по указанному _id не найден.'));
    }
    return res.send(user);
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
    } return next(new InternalServerError('Ошибка по умолчанию.'));
  }
};

const getAuthorizedUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return next(new NotFoundError('Пользователь по указанному _id не найден.'));
    }
    return res.send(user);
  } catch (e) {
    return next(new InternalServerError('Ошибка по умолчанию.'));
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      return next(new NotFoundError('Пользователь по указанному _id не найден.'));
    }
    return res.send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
    } return next(new InternalServerError('Ошибка по умолчанию.'));
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      return next(new NotFoundError('Пользователь по указанному _id не найден.'));
    }
    return res.send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
    } return next(new InternalServerError('Ошибка по умолчанию.'));
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  getAuthorizedUser,
  login,
};
