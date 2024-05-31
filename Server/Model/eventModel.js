const mongoose = require('mongoose');

const eventModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Events', eventModel);
