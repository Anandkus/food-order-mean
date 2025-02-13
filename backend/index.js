const exp = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

const app = exp();
dotenv.config({ path: "./config.env" });
const port = process.env.PORT;

const { coonetDb } = require("./confiq/conn");
const auth = require("./routers/auth");
const admin = require("./routers/admin");
const food = require("./routers/food");
const cart = require("./routers/cart");

//to access all field value by router 
app.use(exp.json());
// Enable CORS for all routes
app.use(cors());
app.use('/images', exp.static('public/images')); // Serve images statically

app.use("/auth", auth);
app.use("/admin", admin);
app.use("/food", food);
app.use("/cart", cart);

app.listen(port, async () => {
  await coonetDb()
  console.log(`server is run ${port}`)
})