// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Timestamp api
app.get('/api/timestamp/:date_string?', (req, res) => {
  const dateString = req.params.date_string;
  const parsedDate = Number.isInteger(+dateString)
    ? new Date(+dateString)
    : new Date(dateString);
  const unixTime = parsedDate.getTime();
  const resJson = unixTime
    ? { unix: unixTime, utc: parsedDate.toUTCString() }
    : { error: 'Invalid Date' };
  res.json(resJson);
});

const PORT = process.env.PORT || 3000;

// listen for requests :)
const listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
