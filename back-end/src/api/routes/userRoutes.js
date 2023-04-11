const express = require('express');
const { 
  requestLogin, 
  requestUserRegistration, 
  requestAllUserByRole,
  findUserById,
} = require('../controllers/userControllers');

const router = express.Router();

router.post('/login', requestLogin);
router.post('/register', requestUserRegistration);
router.get('/:role', requestAllUserByRole);
router.get('/:id', findUserById);

module.exports = router;
