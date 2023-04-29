const express = require('express');
const { 
  requestLogin, 
  requestUserRegistration, 
  requestAllUserByRole,
  requestUsersDifferentThanADM,
} = require('../controllers/userControllers');

const router = express.Router();

router.post('/login', requestLogin);
router.post('/register', requestUserRegistration);
router.get('/:role', requestAllUserByRole);
router.get('/', requestUsersDifferentThanADM);

module.exports = router;
