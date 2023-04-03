const express = require('express');
const { 
  requestLogin, 
  requestUserRegistration, 
  requestAllUserByRole,
} = require('../controllers/userControllers');

const router = express.Router();

router.post('/login', requestLogin);
router.post('/register', requestUserRegistration);
router.get('/:role', requestAllUserByRole);

module.exports = router;
