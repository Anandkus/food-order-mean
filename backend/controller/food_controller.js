const foodDetails = require("../models/admin-dashboard");


const category = async (req, res) => {
  try {
    const category = await foodDetails.find().select('category');

    return res.status(200).send({ message: "success", category })

  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

const getCategory = async (req, res) => {
  try {
    // Correctly get the category from the route parameters
    const categoryToFilter = req.params.category;  // Use req.params to access the route parameter
    const food = await foodDetails.find({ category: categoryToFilter });

    if (food.length === 0) {
      return res.status(404).send({ message: "No food items found for this category" });
    }

    return res.status(200).send({ message: "success", food });

  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}
const searchFood = async (req, res) => {
  try {
    const searchToFilter = req.params.search;

    // Use a regular expression for case-insensitive search across multiple fields
    const food = await foodDetails.find({
      $or: [
        { foodname: { $regex: searchToFilter, $options: 'i' } },  // Search in foodname
        { category: { $regex: searchToFilter, $options: 'i' } },  // Search in category
        { desc: { $regex: searchToFilter, $options: 'i' } }       // Search in description
      ]
    });

    if (food.length === 0) {
      return res.status(404).send({ message: "No food items found for this search" });
    }

    return res.status(200).send({ message: "success", food });

  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

const allFoods = async (req, res) => {
  try {
    const food = await foodDetails.find();
    return res.status(200).send({ message: "success", food })

  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

const foodGetById = async (req, res) => {
  const foodId = req.params.id;
  try {
    const food = await foodDetails.findById(foodId);
    return res.status(200).send({ message: "success", food })

  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

module.exports = { getCategory, category, allFoods, searchFood, foodGetById };
