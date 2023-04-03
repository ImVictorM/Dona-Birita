const express = require('express');
const { allSaleController } = require('../controllers/saleController');

const router = express.Router();

router.get('/orders', allSaleController);

module.exports = router;