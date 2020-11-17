const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const db = require('./config/keys');

const app = express();

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB
mongoose.connect(db.mongoURI, { useNewUrlParser: true })
  // .then(() => console.log('/////// \n MongoDB Connection established... \n////////'))
  // .catch(err => console.log(`/////// \n ${err} \n//////////`));

const connection = mongoose.connection;
connection.once('open', _ => {
  console.log(`Database Connected... ${url}`);
})
connection.on('error', err => {
  console.error(`Connectino Error: ${err}`);
})

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Static Content
app.use(express.static(`public`));

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

// const PORT = process.env.PORT || 5000;
const PORT = 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));