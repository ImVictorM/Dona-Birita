const express = require('express');
const cors = require('cors');
const handleError = require('./middlewares/errorHandler');
require('express-async-errors');

const app = express();
const { userRouter } = require('./routes');

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use('/login', userRouter);

app.use(handleError);

module.exports = app;
