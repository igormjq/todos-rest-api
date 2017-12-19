const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let pass = 'cerkinha1';
let hashed = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTM4ODIxN2Y5M2FiMTE3NGFiYjA5MWYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTEzNjUyNzU5fQ.2RFib_Rau3ko6-j3WBJBnOfIdMu_ZAx-MOQDv-NDnco';

// Generates salt and hashes the password

// bcrypt.genSalt(10)
//   .then(salt => {
//     return bcrypt.hash(pass, salt);
//   })
//   .then(p => console.log(`password ${p}`))
//   .catch(err => console.log(err));


// Compares the plain text password to the hashed password stored in database

// bcrypt
//   .compare(pass, hashed)
//     .then(p => console.log(p))
//     .catch(err => console.log(err));