const mongoose = require("mongoose");

const InsuranceSchema = mongoose.Schema({
  _id: { type: String },
  
  logo: String,
  name: String,

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  email: String,
  age: Number,
  mobile: String,
  country: String,
  state: String,
  city: String,
  gender: String,
   address: String,
   amount: String,
   date: String
});

module.exports = mongoose.model("Insurance", InsuranceSchema);
