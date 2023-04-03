const { allSaleService } = require('../services/sales.service');

async function allSaleController(req, res) {
  const { id } = req.params;
  const getAllSale = await allSaleService(id);
  res.status(200).json(getAllSale);
}

module.exports = {
  allSaleController,
};