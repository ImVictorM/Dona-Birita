const express = require('express');
const handleError = require('./middlewares/errorHandler');

const app = express();
const { userRouter } = require('./routes');

app.use(express.json());
app.use('/login', userRouter);
app.get('/coffee', (_req, res) => res.status(418).end());

app.use(handleError);

module.exports = app;
