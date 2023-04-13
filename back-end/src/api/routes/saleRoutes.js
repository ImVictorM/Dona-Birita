const express = require('express');

const router = express.Router();

const {
  requestToRegisterNewSale,
  allSaleController,
  updateSale,
} = require('../controllers/sale.controller');

router.post('/', requestToRegisterNewSale);
router.get('/orders/:id', allSaleController);
router.patch('/:id', updateSale);

module.exports = router;
