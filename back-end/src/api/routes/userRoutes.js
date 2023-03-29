const express = require('express');
const { requestLogin, requestUserRegistration } = require('../controllers/userControllers');

const router = express.Router();

router.post('/login', requestLogin);
router.post('/register', requestUserRegistration);

module.exports = router;
