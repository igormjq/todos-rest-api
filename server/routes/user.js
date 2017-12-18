const express = require('express');
const Controller = require('../controllers/users');

const router = express.Router();

const User = require('../models/user');
const UserController = new Controller(User);

let test = (req, res, next) => {
  console.log('ola');
  next();
}

router.route('/')
  .post((req, res) => {
    UserController.createNewUser(req, res); 
  });

router.route('/me')
  .get((req, res) => {
    
    UserController.findByToken(req, res);
  });

router.use('/flongers', (req, res, next) => {
  console.log('before flongers');
  next();
}).route('/flongers').get((req, res) => {
  console.log('flongers!!!!');
  res.send('flongers!!!!');
})

module.exports = router;