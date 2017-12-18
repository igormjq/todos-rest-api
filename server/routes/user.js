const express = require('express');
const Controller = require('../controllers/users');

const router = express.Router();

const User = require('../models/user');
const UserController = new Controller(User);

router.route('/')
  .post((req, res) => {
    UserController.createNewUser(req, res); 
  });

module.exports = router;