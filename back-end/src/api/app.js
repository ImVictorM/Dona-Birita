const express = require('express');

const app = express();
const { userRouter } = require('./routes');

app.use(express.json());
app.use('/login', userRouter);
app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
