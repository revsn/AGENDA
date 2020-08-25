const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  events: {
    count: { type: Number, default: 1 },
    event: {
      type: Array, default: [{
        title: 'Getting Started',
        description: 'This is your first Event',
        date: Date(Date.now()),
        isPublic: true,
        author: 'assist bot',
      }]
    }
  }
});


const User = mongoose.model('User', UserSchema);

module.exports = User;

