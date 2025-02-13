const mongoose = require('mongoose');

const cartShcema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true, // ensure email is required
    trim: true,     // remove spaces around the email
    unique: true,   // ensure email is unique
    lowercase: true // ensure email is stored in lowercase
  },
  mobile: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    default: 0
  },
  totalPrice: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodUser"
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address"
  },
  foodId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "dashboard"
  }],
  status: String,
  orderDate: {
    type: Date,
    default: Date.now()
  },
  deliveryDate: {
    type: Date,
  }
})

const orderModel = mongoose.model("foodOrder", cartShcema);
module.exports = orderModel;