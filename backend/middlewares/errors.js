const http2 = require('node:http2');
const NotFoundError = require('../errors/NotFoundError');

const SERVER_ERROR = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR; // 500

const handleNotFoundUrl = (req, res, next) => {
  next(new NotFoundError('По указанному url ничего нет'));
};

const handleErrors = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR
      ? 'На сервере произошла ошибка'
      : message,
  });

  next();
};

module.exports = { handleNotFoundUrl, handleErrors };
