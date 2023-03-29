const express = require('express');
const { requestLogin } = require('../controllers/userControllers');

const router = express.Router();

router.post('/', requestLogin);

module.exports = router;
