const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/index');

const { PORT, MONGO_URL } = require('./config');

const app = express();
app.use(
  cors({
    origin: [
      'http://localhost:3001',
      'https://skormaksim.nomoredomains.monster',
    ],
  }),
);

mongoose.connect(MONGO_URL, {});

// удалить после ревью
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.listen(PORT, () => {
  // console.log(`Listen port:${PORT}`);
});
