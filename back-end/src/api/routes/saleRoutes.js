const express = require('express');

const router = express.Router();

const {
  requestToRegisterNewSale,
  requestUserSales,
  requesToUpdateSaleStatus,
  requestSaleByID,
} = require('../controllers/sale.controller');

router.get('/:id', requestSaleByID);
router.post('/', requestToRegisterNewSale);
router.get('/:role/:id', requestUserSales);
router.patch('/:id', requesToUpdateSaleStatus);

module.exports = router;
