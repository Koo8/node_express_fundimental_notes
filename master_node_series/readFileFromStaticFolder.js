const express = require("express");
const path = require("path");
//import data
const comments = require("./data");
const app = express();

// setup static and middleware
app.use(express.static("./public")); // frontend folder holistically as a static resource

// move index.html to 'static' asset folder with css and js, so this following is not needed anymore
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './Frontapp/index.html'))
// })

app.set("json spaces", 2);
// access api data
app.get("/api", (req, res) => {
  // res.json({
  //     name: 'Nancy',
  //     hobby: ['coding', 'traveling', 'cooking']
  // })
  res.json(comments);
});

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});
app.listen(5000, () => {
  console.log("Listening to port 5000");
});
