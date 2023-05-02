const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('jwt.evaluation.key').toString();

async function adminGuard(req, res, next) {
  const { authorization } = req.headers;
  const loggedUser = jwt.verify(authorization, secret).dataValues;
  if (loggedUser.role === 'administrator') {
    return next();
  } 
  return res.status(403).json({ message: 'Forbidden' });
}

module.exports = adminGuard;
