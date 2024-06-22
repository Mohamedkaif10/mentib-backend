const mongoose = require('mongoose');

const messageModel = new mongoose.Schema({
   room: {
      type: String,
      required: true
   },
    text: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    createdAt: {
      type: String,
      default: Date.now
    },
    receiver: {
      type: String,
      required: true
    }

});

module.exports = mongoose.model('Messages', messageModel);
