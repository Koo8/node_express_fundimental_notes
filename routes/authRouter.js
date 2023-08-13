const express = require('express');
const router = express.Router();

// for methods-public/index.html/form/action & POST method
router.post('/', (req, res) => {
  // check if name from req.body exist, only exists if input field has a value 
  // post method always has req.body
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`) // this should be login page layout
  } 
  else {
    return res.status(401).send('please provide a name in input field')
  }
})

module.exports=router