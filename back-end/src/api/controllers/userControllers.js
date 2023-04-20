const { 
  loginUser, 
  registerNewUser, 
  getAllUserByRole, 
  getUserById,
 } = require('../services/user.service');

async function requestLogin(req, res) {
  const userFromReq = req.body;
  const userWithToken = await loginUser(userFromReq);
  return res.status(200).json(userWithToken);
}

async function requestUserRegistration(req, res) {
  const userToRegister = req.body;
  const userWithToken = await registerNewUser(userToRegister);
  return res.status(201).json(userWithToken);
}

async function requestAllUserByRole(req, res) {
  const { role } = req.params;

  const sellerList = await getAllUserByRole(role);
  return res.status(200).json(sellerList);
}

async function requestUserById(req, res) {
  const { id } = req.params;
  const user = await getUserById(id);
  return res.status(200).json(user);
}

module.exports = {
  requestLogin,
  requestUserRegistration,
  requestAllUserByRole,
  requestUserById,
};
