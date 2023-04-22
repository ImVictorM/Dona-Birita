const express = require('express');

const router = express.Router();

const {
  requestToRegisterNewSale,
  allSaleController,
  updateSale,
  requestSaleByID,
} = require('../controllers/sale.controller');

router.get('/:id', requestSaleByID);
router.post('/', requestToRegisterNewSale);
router.get('/orders/:id', allSaleController);
router.patch('/:id', updateSale);

module.exports = router;
