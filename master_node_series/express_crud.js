/**All the routes are regrouped into 'routes' folder with different routers */

const express = require("express");
const people = require("./data/people");
const app = express();

// for parse input field value
app.use(express.urlencoded({ extended: false }));
// for parsing incoming json from frontend input field post request
app.use(express.json());

// indentation for json file
app.set("json spaces", 2);

app.use(express.static("./methods-public")); // look for index.html and all files mentioned in it.
// api routes
app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

// for post to 'api/people' endpoint
app.post("/api/people", (req, res) => {
  /**NOTE: without middleware express.json(), the req.body is {}, otherwise it is {name:''} or {name:'nancy'} */
  // console.log(req.body)
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide a name before submit" });
  }
  // note: json({ success: true, person:name}) whole thing is the 'data' sent as part of response to frontend
  const nameArray = name.split(" ");
  const firstName = nameArray[0];
  const lastName = nameArray[1];
  return res
    .status(201)
    .json({
      success: true,
      data: [...people, { firstName, lastName }],
      person: name,
    }); //The person:name is needed for javascript.html ->submit form-> dynamically add new person
});

// for methods-public/index.html/form/action & POST method
app.post("/login", (req, res) => {
  // check if name from req.body exist, only exists if input field has a value
  // post method always has req.body
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`); // this should be login page layout
  } else {
    return res.status(401).send("please provide a name in input field");
  }
});

// put for updating existing data // use postman for testing out, not frontend relevent page for this method yet
app.put("/api/people/:id", (req, res) => {
  const { id } = req.params; // url user input
  const { name } = req.body; // input field value
  console.log(id, name);
  const person = people.find((per) => per.id === Number(id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `No such person with id ${id}` });
  } else {
    const newPeople = people.map((per) => {
      if (per.id === Number(id)) {
        console.log(per.lastName);
        const nameArray = name.split(" ");
        per.firstName = nameArray[0];
        per.lastName = nameArray[1];
      }
      return per;
    });
    return res.status(200).json({ success: true, data: newPeople });
  }
});

app.delete("/api/people/:id", (req, res) => {
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  );
  res.status(200).json({ success: true, data: newPeople });
});
app.listen(5000, () => {
  console.log(`listening to port 5000`);
});
