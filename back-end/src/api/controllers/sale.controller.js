const { registerNewSale } = require('../services/sale.service');

async function requestToRegisterNewSale(req, res) {
  const saleToRegister = req.body;
  const createdSale = await registerNewSale(saleToRegister);
  return res.status(201).json(createdSale);
}

module.exports = {
  requestToRegisterNewSale,
};
