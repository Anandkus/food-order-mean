const exp = require("express");
const foodDetails = require("../models/admin-dashboard");
const router = exp.Router();
const authenticate = require("../middleware/authenticate");
const { category, getCategory, allFoods, searchFood, foodGetById } = require("../controller/food_controller");

router.get("/tag", category);
router.get("/tag/:category", getCategory);
router.get("/", allFoods);
router.get('/:search', searchFood);
router.get("/by/:id", authenticate, foodGetById)


module.exports = router;