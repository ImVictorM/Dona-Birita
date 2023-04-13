const { Sale, SaleProduct, Product } = require('../../database/models');

async function findProductsQuantity(id) {
  const pedido = await Sale.findAll({
    where: { id },
    include: [{
      model: Product,
      as: 'products',
      attributes: ['name', 'price'],
    },
  ],
  through: { 
    model: SaleProduct,
  },
  });
  return pedido;
}

module.exports = findProductsQuantity;