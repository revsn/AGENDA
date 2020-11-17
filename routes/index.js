const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const date = new Date();

const app = express();
app.use(express.static('public'));


const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    name: req.user.name,
    username: req.user.username,
    active: req.user.register_date.toDateString(),
    events: req.user.events,
    isLoggedIn: req.isLogged,
    date: {
      thisMonth: date.getMonth(),
      thisYear: date.getFullYear(),
    }
  })
);

// View User
router.get('/:user', ensureAuthenticated, (req, res) => {
  if (req.params.user === "users") res.redirect('/users/login');
  let profile = null;
  
  User.findOne({ username: req.params.user }).then(user => {
    if (user) {
      profile = {
        name: user.name,
        username: user.username,
        followers: user.followers,
        following: user.following,
        events: user.events
      }
    }
    res.render('profile', {
      profile: profile,
      isUser: req.params.user == req.user.username
    })
  })
});


module.exports = router;
