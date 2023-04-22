const { 
  registerNewSale, 
  allSaleService, 
  updateState, 
  getSaleByID,
} = require('../services/sale.service');

async function requestToRegisterNewSale(req, res) {
  const saleToRegister = req.body;
  const createdSale = await registerNewSale(saleToRegister);
  return res.status(201).json(createdSale);
}

async function allSaleController(req, res) {
  const { id } = req.params;
  const getAllSale = await allSaleService(id);
  res.status(200).json(getAllSale);
}

async function updateSale(req, res) {
  const { status } = req.body;
  const { id } = req.params;
  await updateState(status, Number(id));
  res.status(200).end();
}

async function requestSaleByID(req, res) {
  const { id } = req.params;
  const sale = await getSaleByID(id);
  return res.status(200).json(sale);
}

module.exports = {
  requestToRegisterNewSale,
  allSaleController,
  requestSaleByID,
  updateSale,
};
