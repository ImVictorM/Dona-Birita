const crypto = require('crypto');

function comparePasswords(password, hashToCompare) {
  const passwordToHash = crypto.createHash('md5').update(password).digest('hex');
  return passwordToHash === hashToCompare;
}

module.exports = { 
  comparePasswords, 
};
