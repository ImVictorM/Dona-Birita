const express = require('express');

const router = express.Router();

const { requestToRegisterNewSale } = require('../controllers/sale.controller');

router.post('/', requestToRegisterNewSale);

module.exports = router;
