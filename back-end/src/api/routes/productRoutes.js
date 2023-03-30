const express = require('express');

const router = express.Router();
const { requestAllProduct } = require('../controllers/product.controller');

router.get('/', requestAllProduct);

module.exports = router;