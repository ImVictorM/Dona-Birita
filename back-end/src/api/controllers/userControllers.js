const { loginUser, registerNewUser, getAllUserByRole } = require('../services/user.service');

async function requestLogin(req, res) {
  const userFromReq = req.body;
  const token = await loginUser(userFromReq);
  return res.status(200).json(token);
}

async function requestUserRegistration(req, res) {
  const userToRegister = req.body;
  const createdUser = await registerNewUser(userToRegister);
  return res.status(201).json(createdUser);
}

async function requestAllUserByRole(req, res) {
  const { role } = req.params;
  const sellerList = await getAllUserByRole(role);
  return res.status(200).json(sellerList);
}

module.exports = {
  requestLogin,
  requestUserRegistration,
  requestAllUserByRole,
};
