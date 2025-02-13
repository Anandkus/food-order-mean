const User = require("../models/user");
const adminDashboard = require("../models/admin-dashboard");
const bcrypt = require("bcrypt");
const jwtProvider = require("../confiq/jwtProvider");


const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: "All fields are required!" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found!" });
    }
    // Ensure the user is an admin
    if (user.role !== "admin") {
      return res.status(403).send({ message: "Access denied! Admins only." });
    }
    const isPassword = await bcrypt.compare(password, user.password)
    if (!isPassword) {
      return res.status(400).send({ message: "Invalid credentials!" });
    }
    //to send user data but without password 
    const { password: _, ...userDataWithoutPassword } = user.toObject()
    const token = jwtProvider.generateToken(user._id);
    return res.status(200).send({
      message: "Login successful!",
      token,
      user: userDataWithoutPassword
    })
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

const dashboard = async (req, res) => {
  const { foodname, price, desc, foodtime, category } = req.body;
  try {
    if (!foodname || !price || !desc || !foodtime || !category || !req.file) {
      return res.status(400).send({ message: "All fields are required!" });
    }
    const foodItem = new adminDashboard({
      foodname, price, desc, foodtime, category, foodimg: req.file.filename
    })
    await foodItem.save();
    res.status(200).send({
      message: 'Food item uploaded successfully!',
      foodItem
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

const getAllFoods = async (req, res) => {
  try {
    const foods = await adminDashboard.find();  // Renamed variable to 'foods' to avoid shadowing
    return res.status(200).send({
      message: "successfull !",
      food: foods
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteFood = async (req, res) => {
  const id = req.params.id;
  try {
    const food = await adminDashboard.findByIdAndDelete(id);
    if (!food) {
      return res.status(404).send({ message: "Food not found!" });  // Handle case where the food doesn't exist
    }
    return res.status(200).send({
      message: "Deleted successfully!",
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getSingleFood = async (req, res) => {
  const id = req.params.id;
  try {
    const food = await adminDashboard.findById(id);
    if (!food) {
      return res.status(404).send({ message: "Food not found!" });
    }
    return res.status(200).send({
      message: "Food retrieved successfully!",
      food
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { adminLogin, dashboard, getAllFoods, deleteFood, getSingleFood }