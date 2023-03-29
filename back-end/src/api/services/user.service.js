const { User } = require('../../database/models');
const ExceptionWithErrorCode = require('../error/ExceptionWithErrorCode');
const { comparePasswords } = require('../utils/crypto');
const { generateToken } = require('../utils/jwt');

function validateLoginAttempt(userFromReq, userFromDB) {
  if (!userFromDB) {
    throw new ExceptionWithErrorCode(404, 'User not Found');
  }

  const passwordIsValid = comparePasswords(userFromReq.password, userFromDB.password);

  if (!passwordIsValid) {
    throw new ExceptionWithErrorCode(400, 'Invalid User');
  }
}

async function loginUser(userFromReq) {
  const userFromDB = await User.findOne({
    where: { 
      email: userFromReq.email,
    },
  });

  validateLoginAttempt(userFromReq, userFromDB);

  const token = generateToken(userFromDB);
  return token;
}

module.exports = {
  loginUser,
};
