export const SELLER_LIST = [
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    role: 'seller',
  },
];

export const CART = [
  {
    productId: 1,
    name: 'Skol Lata 250ml',
    unitPrice: '2.20',
    quantity: 2,
    subTotal: 4.4,
  },
  {
    productId: 2,
    name: 'Heineken 600ml',
    unitPrice: '7.50',
    quantity: 1,
    subTotal: 7.5,
  },
];

export const ORDER_TO_CHECKOUT = {
  seller: SELLER_LIST[0].name,
  address: 'N Hamilton Rd',
  number: '300',
};

export const CHECKOUT_RESPONSE = {
  id: 4,
  userId: 3,
  sellerId: 2,
  totalPrice: '7.50',
  deliveryAddress: 'N Hamilton Rd',
  deliveryNumber: '300',
  status: 'Pendente',
  saleDate: '2023-06-30T21:51:02.983Z',
};
