const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  price: { type: Number, required: true },
  Bhk: { type: Number },
  area: { type: Number },
  //type:Residential, Commercial
  type: { type: String, required: true },
  //status:Available, Sold, Rented
  status: { type: String },
  //purpose:Buy, Rent,PG/Coliving
  purpose: {
    type: String,
  },
  phone: {
    type: String,
  },
  mail: {
    type: String,
  },
  amenities: { type: [String], default: [] },
  created_at: { type: Date, default: Date.now },
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
