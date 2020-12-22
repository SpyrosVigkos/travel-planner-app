// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

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



// GET route
app.get('/all', sendData);

function sendData (request, response) {

  console.log("Request sent");
  response.send(projectData);

};

// POST route
app.post('/', callBack);

function callBack(request, response){
  console.log(request.body);
  
  projectData = {
      temperature : request.body.temperature,
      date : request.body.date,
      feelings : request.body.feelings
  };
  response.send(projectData);
  console.log(projectData);

};

