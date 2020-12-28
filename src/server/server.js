// Setup empty JS object to act as endpoint for all routes
let plannerData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
require('dotenv').config();

const axios = require('axios');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
})

/* Spin up the server*/
// Setup Server
const port = 3010; 
app.listen(port, function (){
    console.log('server:');
    console.log(`running on localhost: ${port}`);
});

//API Variables 
//Geonames Webservices 
const geoUrl = ' http://api.geonames.org/searchJSON?q=';
const geoApi = `&maxRows=1&username=${process.env.GEONAME_USER}`;

// POSTS routes

////Geoname Posts
app.post('/geoNames', async(req, res) =>{
  try {
    const geoNames = await axios.post(`${geoUrl}${req.body.formPlace}${geoApi}`);
    
    const {data} = geoNames;
    res.send(data);

    plannerData={
      long : data.lag,
      lat : data.lat,
      city: data.name,
      country: data.countryName,
      code: data.countryCode

    }


  } catch (error) {
    console.log(`${error}`)
  }
})



app.post('/', callBack);

function callBack(request, response){
  console.log(request.body);
  
  plannerData = {
      temperature : request.body.temperature,
      date : request.body.date,
      feelings : request.body.feelings
  };
  response.send(plannerData);
  console.log(plannerData);

};

// GET route
app.get('/all', sendData);

function sendData (request, response) {

  console.log("Request sent");
  response.send(plannerData);

};