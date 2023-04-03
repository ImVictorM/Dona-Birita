const { Sale } = require('../../database/models');

async function registerNewSale(saleFromReq) {
  const creationResponse = await Sale.create(saleFromReq);
  return creationResponse;
}

module.exports = {
  registerNewSale,
};
