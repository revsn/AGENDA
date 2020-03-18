const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

const app = express();
app.use(express.static('public'));


const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// profile
router.get('/profile', forwardAuthenticated, (req, res) => res.render('profile'));


// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user, isLoggedIn: req.isLogged
  })
);

module.exports = router;
