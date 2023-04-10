const express = require('express');

const router = express.Router();

const { requestToRegisterNewSale, allSaleController } = require('../controllers/sale.controller');

router.post('/', requestToRegisterNewSale);
router.get('/orders/:id', allSaleController);

module.exports = router;
