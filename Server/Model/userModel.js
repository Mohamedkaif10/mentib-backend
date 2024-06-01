const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  usedCoins: {
    type: Number,
    required: true
  },
  availableCoins: {
    type: Number,
    required: true
  },

});

module.exports = mongoose.model('User', userModel);
