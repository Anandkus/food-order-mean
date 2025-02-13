const mongoose = require("mongoose");

// Define the user schema with better validation
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "buyer"
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
  password: {
    type: String,
    required: true,
    minlength: 6,  // password should be at least 6 characters long
    trim: true
  },
  cartId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dashboard"
    }
  ],
  orderId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodOrder"
  }],
}, {
  timestamps: true // automatically add createdAt and updatedAt fields
});

// Create a model from the schema
const User = mongoose.model("foodUser", userSchema);

// Export the model for use in other parts of the app
module.exports = User;
