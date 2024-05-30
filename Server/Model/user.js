const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
 phoneno:{
  type:Number,
  unique:true

 },
 age:{
  type:Number
 },
 gender:{
  type: String, enum: ['Male', 'Female', 'Other'], required: true 
 },
 city: { type: String}
});

module.exports = mongoose.model('User', userSchema);
