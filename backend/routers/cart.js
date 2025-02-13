const exp = require("express");
const router = exp.Router();
const authenticate = require("../middleware/authenticate");
const { addTocart, cartDetails, cartRemove } = require("../controller/cart_controller");

router.post('/add', authenticate, addTocart);
router.get("/data", authenticate, cartDetails);
router.delete("/delete/:id", authenticate, cartRemove);



module.exports = router;