const VALID_USER_TO_LOGIN = {
  email: 'zebirita@email.com',
  password: '$#zebirita#$',
};

const VALID_USER_AND_INVALID_PASSWORD = {
  ...VALID_USER_TO_LOGIN,
  password: 'wrongpassword',
};

const INVALID_USER_TO_LOGIN = {
  email: 'unvalid_user@email.com',
  password: 'invalidpassword',
};

const VALID_USER_RESPONSE_FROM_DB = {
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  role: 'customer',
};

const VALID_USER_TO_REGISTER = {
  email: 'validuser777@email.com',
  password: 'supersecretpassword',
};

module.exports = {
  VALID_USER_TO_LOGIN,
  VALID_USER_AND_INVALID_PASSWORD,
  INVALID_USER_TO_LOGIN,
  VALID_USER_RESPONSE_FROM_DB,
  VALID_USER_TO_REGISTER,
};
