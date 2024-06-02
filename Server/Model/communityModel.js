const mongoose = require('mongoose');
const { Schema } = mongoose;

const communityModel = new Schema({
  name: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  noofpeople:{type:Number,required:true,default:0},
  createdby: { type: String, required: true ,ref:'User'},
  people: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Community = mongoose.model('Community', communityModel);

module.exports = Community;
