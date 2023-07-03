const { Sequelize } = require('sequelize');
const { Sale, SaleProduct, User, Product } = require('../../database/models');

const { NODE_ENV = 'test' } = process.env;

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

async function getSaleByID(id) {
  const sale = await Sale.findOne({
    where: { id },
    include: [
      {
        model: Product,
        as: 'products',
        attributes: ['name', 'price'],
        through: { model: SaleProduct },
      },
      {
        model: User,
        as: 'seller',
        attributes: { exclude: ['password'] },
      },
    ],
    attributes: { exclude: ['sellerId'] },
  });

  return sale;
}

async function getUserSales(id, role) {
  switch (role) {
    case 'seller':
      return Sale.findAll({
        where: { sellerId: id }, 
      });
    case 'customer':
      return Sale.findAll({ 
        where: { userId: id }, 
      });
    default:
      return null;
  }
}

async function updateSaleStatus(status, id) {
  await Sale.update({ status }, { where: { id } });
}

module.exports = {
  registerNewSale,
  getUserSales,
  getSaleByID,
  updateSaleStatus,
};
