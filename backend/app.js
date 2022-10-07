require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);
app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
