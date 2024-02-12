// MJS 2.8.24 - HW 11 Express Note Taker - Started From Miniproject server.js
// I put this M##D8*()(E file in the same relative directory as Example 17, which is the dir with README.md.
// This mandates adding Develop to the paths below. MJS 1:27
console.log("HW11: starting server.js");
const express = require('express');
const path = require('path');
// const { clog } = require('./middleware/clog');
console.log("HW11: requiring index.js");
const api = require('./Develop/public/assets/js/index.js');
console.log("HW11: Done requiring index.js");

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
// app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage - loads index.html, which seems to work 2.8 2:44 MJS
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
);

// GET Route for db.json -
app.get('/Develop/db/db.json', (req, res) =>
  res.sendFile(path.join(__dirname, 'Develop/db/db.json'))
);

// Very simple get route ... to log among other things. 
app.get('/MJS', (req, res) => {
  console.log("Found path MJS");
  res.sendFile(path.join(__dirname, 'Develop/db/db.json'))
}
);

// GET Route for feedback page
app.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
);

// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/404.html'))
);

app.listen(PORT, () =>
  console.log(`MJS App listening at http://localhost:${PORT}`)
);
