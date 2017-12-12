const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = { 
  id: 10
};

let token = jwt.sign(data, '123abc');

console.log(token);

let decoded = jwt.verify(token + '1', '123abc');

console.log('decoded', decoded);

// let data = {
//   id: 4
// };

// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'secret').toString()
// };

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// let expectedHash = SHA256(JSON.stringify(token.data) + 'secret').toString();

// if(expectedHash === token.hash) {
//   console.log('Not changed');
// } else {
//   console.log('ALEEEEEEEEEEEEEEEEEEEERT! CHANGED!');
// }
