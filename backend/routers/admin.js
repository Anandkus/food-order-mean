const exp = require("express");
const { adminLogin, dashboard, getAllFoods, getSingleFood, deleteFood } = require("../controller/admin_controller");
const authenticate = require("../middleware/authenticate");
const upload = require("../confiq/multer");
const router = exp.Router();

router.post("/login", adminLogin);
router.post("/dashboard", authenticate, upload.single('foodimg'), dashboard);
router.get("/getfoods", authenticate, getAllFoods);
router.delete("/delete/:id", authenticate, deleteFood);
router.get("/get/:id", authenticate, getSingleFood);


module.exports = router;