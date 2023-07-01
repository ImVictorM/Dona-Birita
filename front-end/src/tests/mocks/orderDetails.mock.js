export const PENDING_CUSTOMER_ORDER = {
  deliveryAddress: 'rua jorgin',
  deliveryNumber: '222',
  id: 6,
  products: [
    {
      SaleProduct: {
        productId: 1,
        quantity: 1,
        saleId: 6,
      },
      name: 'Skol Lata 250ml',
      price: '2.20',
    },
    {
      SaleProduct: {
        productId: 2,
        quantity: 2,
        saleId: 6,
      },
      name: 'Heineken 600ml',
      price: '7.50',
    },
  ],
  saleDate: '2023-07-01T17:41:20.000Z',
  seller: {
    email: 'fulana@deliveryapp.com',
    id: 2,
    name: 'Fulana Pereira',
    role: 'seller',
  },
  status: 'Pendente',
  totalPrice: '17.20',
  userId: 3,
};

export const IN_TRANSIT_CUSTOMER_ORDER = {
  ...PENDING_CUSTOMER_ORDER,
  status: 'Em Trânsito',
};

export const DELIVERED_CUSTOMER_ORDER = {
  ...IN_TRANSIT_CUSTOMER_ORDER,
  status: 'Entregue',
};
