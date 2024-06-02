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
  role: {
    type: String,
    required: true,
    enum: ['mentor', 'mentee']
  },
  usedCoins: {
    type: Number,
    required: function() {
      return this.role === 'mentee';
    },
    default: 0
  },
  availableCoins: {
    type: Number,
    required: function() {
      return this.role === 'mentee';
    },
    default: 0
  }
});

module.exports = mongoose.model('User', userModel);
