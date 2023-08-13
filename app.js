const express = require('express')
const people = require('./data/people')
const app = express()
const peopleRouter = require('./routes/peopleRouter')
const authRouter = require('./routes/authRouter')
// for parse input field value
app.use(express.urlencoded({ extended: false }))
// for parsing incoming json from frontend input field post request
app.use(express.json())

// indentation for json file
app.set('json spaces', 2)

app.use(express.static('./testingCrud_frontend_public')) // look for index.html and all files mentioned in it.

app.use('/api/people', peopleRouter)
app.use('/login', authRouter)


// for post to 'api/people' endpoint 



// put for updating existing data // use postman for testing out, not frontend relevent page for this method yet


app.listen(5000, () => {
  console.log(`listening to port 5000`)
})