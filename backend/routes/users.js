const express = require('express');

const {
  userUpdateValidate,
  userUpdateAvatarValidate,
  userIdValidate,
} = require('../middlewares/userValidate');

const userRoutes = express.Router();

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRoutes.get('/', getUsers);

userRoutes.get('/me', getCurrentUser);

userRoutes.get('/:userId', userIdValidate, getUserById);

userRoutes.patch('/me', express.json(), userUpdateValidate, updateUser);

userRoutes.patch('/me/avatar', express.json(), userUpdateAvatarValidate, updateAvatar);

module.exports = userRoutes;
