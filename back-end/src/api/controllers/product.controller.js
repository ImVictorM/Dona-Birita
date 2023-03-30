const { getAll } = require('../services/product.service');

async function requestAllProduct(req, res) {
  const result = await getAll();
  res.status(200).json(result);
}

module.exports = {
  requestAllProduct,
};