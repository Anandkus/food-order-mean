const mongoose = require("mongoose");

const coonetDb = () => {
  mongoose.connect("mongodb://localhost:27017/project1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log(`Db connceted sucessfully`)
  }).catch((err) => console.log(`no connect err=`, `${err}`))
}
module.exports = { coonetDb }