const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');

const createToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = { createToken, verifyToken };
