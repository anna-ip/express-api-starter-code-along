import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data.json'


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())
// req = request what info we get from our request and res= result the result we send back.
// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

//*****Routes with requests:******

//this gets all the infomation from the array
app.get('/nominations', (req, res) => {
  res.json(data)
})

//defines a new endpoint as for this ex. /year....and then a placeholder a variable name as for this ex. /:year 
//.query is a React thing to access whats after the ?(comes the query variables) /won/2010?....
app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const showWon = req.query.won
  let nominationsFromYear = data.filter((item) => item.year_award === +year) //the + before year makes strings into number
  // so if showWon is true then we filter the array one more time to get only the once that have won, and with www.localhost.8080/year/year2010?won=true thats whats shown.
  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win)
  }
  res.json(nominationsFromYear)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
