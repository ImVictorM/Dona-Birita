const { Sale } = require('../../database/models');
const { User } = require('../../database/models');

async function allSaleService(id) {
  const user = await User.findByPk(id);

  if (user.role === 'seller') {
    return Sale.findAll(
      { where: { sellerId: id } },
    );
  } 
    return Sale.findAll(
      { where: { userId: id } },
    );
}

module.exports = {
  allSaleService,
};