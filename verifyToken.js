const jwt = require('jsonwebtoken');

const secret = 'SECRETOSO0';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjb3N0dW1lciIsImlhdCI6MTcxMzY1MDk5M30.IDoHTejU1sjdJupTSCB10UBhi-wXF157OEbgsjEDFg4';

function verifyToken(token, secret){
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);

console.log(payload);
