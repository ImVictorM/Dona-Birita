const { loginUser, registerNewUser } = require('../services/user.service');

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

module.exports = {
  requestLogin,
  requestUserRegistration,
};
