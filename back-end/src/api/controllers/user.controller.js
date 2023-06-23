const { 
  loginUser, 
  registerNewUser, 
  getAllUserByRole,
  removeUser,
  getUsersDifferentThanADM,
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

  const userList = await getAllUserByRole(role);
  return res.status(200).json(userList);
}

async function requestUsersDifferentThanADM(_req, res) {
  const userList = await getUsersDifferentThanADM();
  return res.status(200).json(userList);
}

async function requestToDeleteUser(req, res) {
  const { id } = req.params;
  await removeUser(id);
  return res.status(204).end();
}

module.exports = {
  requestLogin,
  requestUserRegistration,
  requestAllUserByRole,
  requestUsersDifferentThanADM,
  requestToDeleteUser,
};
