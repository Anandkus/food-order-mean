const exp = require("express");
const router = exp.Router();
const { userRegistration, userLogin } = require("../controller/user_controller")

router.post("/res", userRegistration);
router.post("/login", userLogin);


module.exports = router;