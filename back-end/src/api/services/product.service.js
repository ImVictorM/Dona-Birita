const { Product } = require('../../database/models');

async function getAll() {
 const result = await Product.findAll();
 return result;
}

module.exports = {
  getAll,
};