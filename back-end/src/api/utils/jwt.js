const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

async function generateToken(payload) {
  const token = jwt.sign({ ...payload }, secret, { algorithm: 'HS256' });
  return token;
}

module.exports = {
  generateToken,
};
