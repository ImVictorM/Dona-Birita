const { Sequelize } = require('sequelize');
const { Sale, SaleProduct } = require('../../database/models');

const { NODE_ENV } = process.env;

const config = require('../../database/config/config');

const sequelize = new Sequelize(config[NODE_ENV]);

async function registerNewSale(saleFromReq) {
  const { products, ...saleWithoutProducts } = saleFromReq;

  const transaction = await sequelize.transaction(async (currTrans) => {
    const { dataValues } = await Sale.create(saleWithoutProducts, { transaction: currTrans });
    const { id: saleId } = dataValues;
    const salesProductsPromises = products
      .map(({ productId, quantity }) => SaleProduct.create(
        { saleId, productId, quantity },
        { transaction: currTrans },
      ));
    await Promise.all(salesProductsPromises);
    return dataValues;
  });

  return transaction;
}

module.exports = {
  registerNewSale,
};
