const jwt = require('jsonwebtoken');

const secret = 'SECRETOSO0';
const payload = {
  sub: 1,
  role: 'costumer'
}

function singToken(payload, secret){
  return jwt.sign(payload, secret);
}

const token = singToken(payload, secret);

console.log(token)
