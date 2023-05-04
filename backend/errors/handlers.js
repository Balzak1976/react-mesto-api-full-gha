const http2 = require('node:http2');
const NotFoundError = require('./NotFoundError');

const OK = http2.constants.HTTP_STATUS_OK;

const handleNotFoundError = (data, res, message) => {
  if (!data) {
    return Promise.reject(new NotFoundError(message));
  }
  return res.status(OK).send(data);
};

module.exports = { handleNotFoundError };
