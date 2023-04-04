module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales',
      [
        {
          id: 1,
          total_price: 4.40,
          delivery_address: 'Rua do Joãozinho',
          delivery_number: 'Numero da rua do Joãozinho',
          sale_date: new Date(),
          status: 'Pendente',
          user_id: 3,
          seller_id: 2,
        },
        {
          id: 2,
          total_price: 7.50,
          delivery_address: 'Rua da Mariazinha',
          delivery_number: 'Numero da rua da Mariazinha',
          sale_date: new Date(),
          status: 'Entregue',
          user_id: 3,
          seller_id: 2,
        },
      ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  },
};
