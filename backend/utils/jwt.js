const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;

const devMode = NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key';

const createToken = (payload) => jwt.sign(payload, devMode, { expiresIn: '7d' });

const verifyToken = (token) => jwt.verify(token, devMode);

module.exports = { createToken, verifyToken };
