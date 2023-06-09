const http2 = require('node:http2');
const bcrypt = require('bcrypt');

const { handleNotFoundError } = require('../errors/handlers');
const { createToken } = require('../utils/jwt');
const ConflictError = require('../errors/ConflictError');
const User = require('../models/user');

const OK = http2.constants.HTTP_STATUS_OK; // 200
const CREATED = http2.constants.HTTP_STATUS_CREATED; // 201
const userNotFoundMsg = 'Пользователь по указанному _id не найден.';

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(OK).send(user))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => handleNotFoundError(user, res, userNotFoundMsg))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  // хэшируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => {
      const userNoPassword = user.toObject();
      delete userNoPassword.password;

      return res.status(CREATED).send(userNoPassword);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Данный email уже зарегистрирован'));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { _id: id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((user) => handleNotFoundError(user, res, userNotFoundMsg))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { _id: id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => handleNotFoundError(user, res, userNotFoundMsg))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = createToken({ _id: user.id });

      return res.status(OK).send({ token });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getCurrentUser,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
