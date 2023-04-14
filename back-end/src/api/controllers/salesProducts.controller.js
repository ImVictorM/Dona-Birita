const findProductsQuantity = require('../services/salesProducts.service');

async function salesProducts(req, res) {
  const { id } = req.params;
  const result = await findProductsQuantity(Number(id));
  res.status(200).json(result);
}

module.exports = salesProducts;