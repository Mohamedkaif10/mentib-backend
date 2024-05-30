const mongoose = require('mongoose');
const { Schema } = mongoose;

const counsellorSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  timeInterval: { type: String, required: true },
  isOnline: { type: Boolean, required: true },
});

const Counsellor = mongoose.model('Counsellor', counsellorSchema);

module.exports = Counsellor;
