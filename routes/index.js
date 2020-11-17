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
router.get('/:user', (req, res) => {
  let profile = req.params.user;
  if (profile === "users") res.redirect('/users/login');
  res.send(`searching for ${profile}`);
});


module.exports = router;
