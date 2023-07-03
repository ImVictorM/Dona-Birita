const ID_2_SALE = {
  id: 2,
  userId: 3,
  totalPrice: '7.50',
  deliveryAddress: 'Rua da Mariazinha',
  deliveryNumber: 'Numero da rua da Mariazinha',
  status: 'Entregue',
  products: [
    {
      name: 'Heineken 600ml',
      price: '7.50',
      SaleProduct: {
        saleId: 2,
        productId: 2,
        quantity: 1,
      },
    },
  ],
  seller: {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    role: 'seller',
  },
};

const NEW_SALE_TO_REGISTER = {
  userId: '1',
  sellerId: '2',
  totalPrice: '21.2',
  deliveryAddress: 'mock_address',
  deliveryNumber: '14442',
  saleDate: '2023-04-04T19:55:22.366Z',
  status: 'mock_status',
  products: [
    {
      productId: 2,
      quantity: 3,
    },
    {
      productId: 3,
      quantity: 2,
    },
  ],
};

const RESPONSE_NEW_SALE_TO_REGISTER = {
  userId: NEW_SALE_TO_REGISTER.userId,
  sellerId: NEW_SALE_TO_REGISTER.sellerId,
  totalPrice: NEW_SALE_TO_REGISTER.totalPrice,
  deliveryAddress: NEW_SALE_TO_REGISTER.deliveryAddress,
  deliveryNumber: NEW_SALE_TO_REGISTER.deliveryNumber,
  saleDate: NEW_SALE_TO_REGISTER.saleDate,
  status: NEW_SALE_TO_REGISTER.status,
};

const ID_2_SELLER_AND_ID_3_CUSTOMER_SALE = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '4.40',
    deliveryAddress: 'Rua do Joãozinho',
    deliveryNumber: 'Numero da rua do Joãozinho',
    status: 'Pendente',
  },
  {
    id: 2,
    userId: 3,
    sellerId: 2,
    totalPrice: '7.50',
    deliveryAddress: 'Rua da Mariazinha',
    deliveryNumber: 'Numero da rua da Mariazinha',
    status: 'Entregue',
  },
];

const NEW_STATUS = {
  status: 'Em preparo',
};

module.exports = {
  ID_2_SALE,
  NEW_SALE_TO_REGISTER,
  RESPONSE_NEW_SALE_TO_REGISTER,
  ID_2_SELLER_AND_ID_3_CUSTOMER_SALE,
  NEW_STATUS,
};
