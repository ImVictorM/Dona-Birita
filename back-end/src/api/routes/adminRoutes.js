const express = require('express');
const adminGuard = require('../middlewares/adminGuard');
const { 
  requestUserRegistration,
  requestToDeleteUser,
 } = require('../controllers/userControllers');

const router = express.Router();

router.use(adminGuard);

router.post('/user/register', requestUserRegistration);
router.delete('/user/:id', requestToDeleteUser);

module.exports = router;
