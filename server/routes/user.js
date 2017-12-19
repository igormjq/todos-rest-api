const express = require('express');
const Controller = require('../controllers/users');

const router = express.Router();

const User = require('../models/user');
const UserController = new Controller(User);
const auth = require('../middlewares/auth');

router.route('/')
  .post((req, res) => {
    UserController.createNewUser(req, res); 
  });

router.use(auth)
.route('/me')
  .get((req, res) => {
    UserController.findByToken(req, res);
  });

module.exports = router;