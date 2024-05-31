const mongoose = require('mongoose');
const { Schema } = mongoose;

const counsellorModel = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  timeInterval: { type: String, required: true },
  isOnline: { type: Boolean, required: true },
});

const Counsellor = mongoose.model('Counsellor', counsellorModel);

module.exports = Counsellor;
