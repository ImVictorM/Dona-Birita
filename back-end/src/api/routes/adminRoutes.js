const express = require('express');
const adminGuard = require('../middlewares/adminGuard');
const { requestUserRegistration } = require('../controllers/userControllers');

const router = express.Router();

router.use(adminGuard);

router.post('/register', requestUserRegistration);

module.exports = router;
