const exp = require("express");
const app = exp()
const { coonetDb } = require("./confiq/conn");

app.get("/", (req, res) => {
  res.send("this is working ")
})

app.listen(1101, async () => {
  await coonetDb()
  console.log(`server is run `)
})