const express = require("express");
const logger = require("./middleware/logger");
const authorize = require("./middleware/authorize");
const app = express();

// middleware can be passed to specific route if no need to apply to all
// middleware can be added in the middle of the routes for only applying to the routes below it.
app.use([logger, authorize]);

app.get("/", (req, res) => {
  res.send("Home");
});
app.get("/about", (req, res) => {
  res.send("About");
});

app.listen(5000, () => {
  console.log(`listening to port 5000`);
});
