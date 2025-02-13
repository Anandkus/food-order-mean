const mongoose = require("mongoose");

const adminDashboardSchema = new mongoose.Schema({
  foodname: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  foodtime: {
    type: String,
    required: true
  },
  foodimg: {
    type: String,
  },
  category: {
    type: String,
    required: true
  },
},
  {
    timestamps: true // automatically add createdAt and updatedAt fields
  })

const AdminDashboard = mongoose.model("dashboard", adminDashboardSchema);
module.exports = AdminDashboard;