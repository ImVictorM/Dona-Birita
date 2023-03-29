const crypto = require('crypto');

function hashPassword(password) {
  const passwordToHash = crypto.createHash('md5').update(password).digest('hex');
  return passwordToHash;
}

function comparePasswords(password, hashToCompare) {
  const passwordToHash = hashPassword(password);
  return passwordToHash === hashToCompare;
}

module.exports = { 
  comparePasswords, 
  hashPassword,
};
