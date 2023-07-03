const ALL_ADMS = [
  {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    role: 'administrator',
  },
];

const ALL_SELLERS = [
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    role: 'seller',
  },
];

const ALL_CUSTOMERS = [
  {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    role: 'customer',
  },
];

const ALL_USERS_DIFFERENT_THAN_ADM = [
  ...ALL_SELLERS,
  ...ALL_CUSTOMERS,
];

const VALID_USER_TO_LOGIN = {
  email: 'zebirita@email.com',
  password: '$#zebirita#$',
};

const VALID_USER_AND_INVALID_PASSWORD = {
  ...VALID_USER_TO_LOGIN,
  password: 'wrongpassword',
};

const INVALID_USER_TO_LOGIN = {
  email: 'invalid_user@email.com',
  password: 'invalidpassword',
};

const VALID_USER_RESPONSE_FROM_DB = ALL_CUSTOMERS[0];

const VALID_USER_TO_REGISTER = {
  name: 'valid username',
  email: 'validuser777@email.com',
  password: 'supersecretpassword',
  role: 'customer',
};

const VALID_USER_REGISTER_RESPONSE = {
  name: 'valid username',
  email: 'validuser777@email.com',
  role: 'customer',
};

const INVALID_NAME_USER_TO_REGISTER = {
  name: VALID_USER_RESPONSE_FROM_DB.name,
  email: 'newemail@email.com',
};

const INVALID_EMAIL_USER_TO_REGISTER = {
  name: 'brand new valid name',
  email: VALID_USER_RESPONSE_FROM_DB.email,
};

module.exports = {
  VALID_USER_TO_LOGIN,
  VALID_USER_AND_INVALID_PASSWORD,
  INVALID_USER_TO_LOGIN,
  VALID_USER_RESPONSE_FROM_DB,
  VALID_USER_TO_REGISTER,
  VALID_USER_REGISTER_RESPONSE,
  INVALID_NAME_USER_TO_REGISTER,
  INVALID_EMAIL_USER_TO_REGISTER,
  ALL_SELLERS,
  ALL_CUSTOMERS,
  ALL_ADMS,
  ALL_USERS_DIFFERENT_THAN_ADM,
};
