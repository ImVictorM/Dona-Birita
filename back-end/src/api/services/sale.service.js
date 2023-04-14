const { Sequelize } = require('sequelize');
const { Sale, SaleProduct, User } = require('../../database/models');

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

async function allSaleService(id) {
  const user = await User.findByPk(id);

  if (user.role === 'seller') {
    return Sale.findAll(
      { where: { sellerId: id } },
    );
  } 
    return Sale.findAll({ 
      where: { userId: id }, 
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });
}

async function updateState(status, id) {
  await Sale.update({ status }, { where: { id } });
}

module.exports = {
  registerNewSale,
  allSaleService,
  updateState,
};
