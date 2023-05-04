require('dotenv').config();

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://0.0.0.0:27017/mestodb',
  JWT_SECRET = 'some-secret-key',
} = process.env;

module.exports = {
  PORT,
  MONGO_URL,
  JWT_SECRET,
};
