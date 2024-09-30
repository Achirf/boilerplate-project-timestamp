// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// timestamp endpoint
app.get('/api/:date?', (req, res) => {
  const date_string = req.params.date;
  const utcTime = new Date(Number(date_string)).toUTCString()
  console.log(date_string, utcTime, new Date())
  // if date parameter is empty
  if (date_string == undefined) {
    res.json({
      'unix': new Date().getTime(),
      'utc': new Date().toUTCString()
    })
  } 
  // if an invalid date paramter is provided
  else if (utcTime == 'Invalid Date') {
    res.json({
      'error': 'Invalid Date'
    })
  } 
  // if a valid date is provided
  else if (date_string) {
    res.json({})
  } 
  // if a unix timestamp is provided
  else {
    res.json({
      'unix': Number(req.params.date),
      'utc': utcTime
    })
  }
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
