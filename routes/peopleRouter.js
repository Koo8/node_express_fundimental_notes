const express = require('express');
const router = express.Router();
const people = require("../data/people");

// since this peopleRouter has many requests, use controller to further clean up the code
const { getPeople, createPerosn, changePerson, deletePerson } = require('../controllers/people')

// all routers' callback functions are put into controllers for cleaner code
// router.get("/", getPeople);
// router.post("/", createPerosn);
// router.put("/:id", changePerson);
// router.delete("/:id", deletePerson);

// altenatively using route('/') and chain all the requests of the same end point
router.route('/').get(getPeople).post(createPerosn);
router.route('/:id').put(changePerson).delete(deletePerson)


module.exports = router