const { Sale } = require('../../database/models');

async function allSaleService(sellerId) {
  const saleFromDB = await Sale.findAll(
    { where: { sellerId } },
  );
  console.log(saleFromDB);
  return saleFromDB;
}

module.exports = {
  allSaleService,
};