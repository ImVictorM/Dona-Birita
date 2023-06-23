const { Op } = require('sequelize');
const { User } = require('../../database/models');
const ExceptionWithErrorCode = require('../error/ExceptionWithErrorCode');
const { comparePasswords, hashPassword } = require('../utils/crypto');
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

  const token = await generateToken(userFromDB);
  const user = userFromDB.dataValues;
  delete user.password;
  return { ...user, token };
}

async function validateUserAlreadyExists(userFromReq) {
  const user = await User.findOne({
    where: {
      [Op.or]: [
        { email: userFromReq.email },
        { name: userFromReq.name },
      ],
    },
  });
  if (user) {
    throw new ExceptionWithErrorCode(409, 'User already exists');
  }
}

async function registerNewUser(userFromReq) {
  await validateUserAlreadyExists(userFromReq);
  const passwordHash = hashPassword(userFromReq.password);
  await User.create({ ...userFromReq, password: passwordHash });

  const userWithToken = await loginUser(userFromReq);
  return userWithToken;
}

async function getUsersDifferentThanADM() {
  const userList = await User.findAll({
    where: { role: { [Op.not]: 'administrator' } },
    attributes: { exclude: ['password'] },
  });
  return userList;
}

async function getAllUserByRole(role) {
  const userList = await User.findAll({
    where: { role },
    attributes: { exclude: ['password'] },
  });
  return userList;
}

async function removeUser(id) {
  await User.destroy({
    where: {
      [Op.and]: [
        { id },
        { role: { [Op.not]: 'administrator' } },
      ],
    },
  });
}

module.exports = {
  loginUser,
  registerNewUser,
  getAllUserByRole,
  getUsersDifferentThanADM,
  removeUser,
};
