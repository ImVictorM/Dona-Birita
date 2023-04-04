const { registerNewUser } = require('../services/user.service');

async function registerUser(req, res) {
  const newUser = await registerNewUser(req.body);
  res.status(201).json(newUser);
}

module.exports = {
  registerUser,
};