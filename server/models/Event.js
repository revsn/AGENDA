const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
    title: { type: String, default: 'Getting Started' },
    description: { type: String, default: 'Your first event' },
    date: { type: Date, default: Date.now },
    isPublic: { type: Boolean, default: true },
    author: { type: String, default: 'assist bot' },
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;