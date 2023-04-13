const express = require('express');

const router = express.Router();
const { requestAllProduct } = require('../controllers/product.controller');
const salesProducts = require('../controllers/salesProducts.controller');

router.get('/:id', salesProducts);
router.get('/', requestAllProduct);

module.exports = router;