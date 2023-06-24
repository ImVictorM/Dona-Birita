const { 
  registerNewSale, 
  getUserSales,
  updateSaleStatus, 
  getSaleByID,
} = require('../services/sale.service');

async function requestToRegisterNewSale(req, res) {
  const saleToRegister = req.body;
  const createdSale = await registerNewSale(saleToRegister);
  return res.status(201).json(createdSale);
}

async function requestUserSales(req, res) {
  const { id, role } = req.params;
  const saleList = await getUserSales(id, role);
  return res.status(200).json(saleList);
}

async function requesToUpdateSaleStatus(req, res) {
  const { status } = req.body;
  const { id } = req.params;
  await updateSaleStatus(status, id);
  return res.status(204).end();
}

async function requestSaleByID(req, res) {
  const { id } = req.params;
  const sale = await getSaleByID(id);
  return res.status(200).json(sale);
}

module.exports = {
  requestToRegisterNewSale,
  requestUserSales,
  requestSaleByID,
  requesToUpdateSaleStatus,
};
