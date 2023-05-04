const routes = require('express').Router();
const express = require('express');
const { errors } = require('celebrate');

const { createUser, login } = require('../controllers/users');
const userRoutes = require('./users');
const cardsRoutes = require('./cards');

const { userLoginValidate, userCreateValidate } = require('../middlewares/userValidate');
const auth = require('../middlewares/auth');
const { handleNotFoundUrl, handleErrors } = require('../middlewares/errors');
const { requestLogger, errorLogger } = require('../middlewares/logger');

// ==========================================================================

routes.use(requestLogger);

// registration route
routes.post('/signup', express.json(), userCreateValidate, createUser);
// authorization route
routes.post('/signin', express.json(), userLoginValidate, login);
routes.use(auth);

// inner routes
routes.use('/users', userRoutes);
routes.use('/cards', cardsRoutes);
routes.use(handleNotFoundUrl);

routes.use(errorLogger);

// handler celebrate validator
routes.use(errors());
// handler common errors
routes.use(handleErrors);

module.exports = routes;
