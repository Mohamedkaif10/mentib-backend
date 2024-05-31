const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Events', eventSchema);
