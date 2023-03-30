const jwt = require('jsonwebtoken');

const fs = require('fs');

const secret = fs.readFileSync('jwt.evaluation.key').toString();

async function generateToken(payload) {
  const token = jwt.sign({ ...payload }, secret, { algorithm: 'HS256' });
  return token;
}

module.exports = {
  generateToken,
};
