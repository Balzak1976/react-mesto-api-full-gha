const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;

const key = NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key';

const createToken = (payload) => jwt.sign(payload, key, { expiresIn: '7d' });

const verifyToken = (token) => jwt.verify(token, key);

module.exports = { createToken, verifyToken };
