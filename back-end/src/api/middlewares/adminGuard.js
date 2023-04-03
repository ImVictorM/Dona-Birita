const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('jwt.evaluation.key').toString();

async function adminGuard(req, res, next) {
    const user = jwt.verify(req.headers.authorization, secret).dataValues;
    if (user.role === 'administrator') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
}

module.exports = adminGuard;