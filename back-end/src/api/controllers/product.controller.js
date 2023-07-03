const { getAll } = require('../services/product.service');

async function requestAllProduct(_req, res) {
  const result = await getAll();
  return res.status(200).json(result);
}

module.exports = {
  requestAllProduct,
};
