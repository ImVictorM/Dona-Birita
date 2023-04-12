const express = require('express');
const { 
  requestLogin, 
  requestUserRegistration, 
  requestAllUserByRole,
  requestUserById,
} = require('../controllers/userControllers');

const router = express.Router();

router.post('/login', requestLogin);
router.post('/register', requestUserRegistration);
router.get('/id/:id', requestUserById);
router.get('/:role', requestAllUserByRole);

module.exports = router;
