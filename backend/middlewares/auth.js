const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JsonWebTokenError } = jwt;

const { verifyToken } = require('../utils/jwt');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw (new UnauthorizedError('Необходима авторизация'));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = verifyToken(token);
  } catch (err) {
    // console.log(err);
    if (err instanceof JsonWebTokenError) {
      next(new UnauthorizedError('Необходима авторизация'));
    } else {
      next(err);
    }
  }
  // req.user = { _id: '643941994ffb7ea7616ac7f8' };
  req.user = payload;

  next();
};
