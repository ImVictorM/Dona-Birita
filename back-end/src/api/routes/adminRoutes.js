const express = require('express');
const { registerUser } = require('../controllers/admin.controller');
const adminGuard = require('../middlewares/adminGuard');

const router = express.Router();

router.use(adminGuard);

router.post('/register', registerUser);

module.exports = router;