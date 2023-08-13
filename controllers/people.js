// all callbacks from peopleRouter  request -> for complying with MVC

const people = require('../data/people')

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const createPerosn = (req, res) => {
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
  return res.status(201).json({
    success: true,
    data: [...people, { firstName, lastName }],
    person: name,
  }); //The person:name is needed for javascript.html ->submit form-> dynamically add new person
};

const changePerson = (req, res) => {
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
};

const deletePerson = (req, res) => {
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  );
  res.status(200).json({ success: true, data: newPeople });
};

module.exports = {
    getPeople,
    createPerosn,
    changePerson,
    deletePerson
}