const { loginUser } = require('../services/user.service');

async function requestLogin(req, res) {
  const userFromReq = req.body;
  const token = await loginUser(userFromReq);
  return res.status(200).json({ token });
}

module.exports = {
  requestLogin,
};
