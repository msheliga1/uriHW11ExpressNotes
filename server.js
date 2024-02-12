// MJS 2.8.24 - HW 11 Express Note Taker - Started From Miniproject server.js
// I put this M##D8*()(E file in the same relative directory as Example 17, which is the dir with README.md.
// This mandates adding Develop to the paths below. MJS 1:27
// Got rid of Develop folder per instructor. 
console.log("HW11: starting server.js");
const express = require('express');
const path = require('path');
const fs = require('fs');
// for id, npm install uuid...
const uuid = require('./public/assets/js/uuid'); // for primary key
const { kMaxLength } = require('buffer');
// const { clog } = require('./middleware/clog');
console.log("HW11: requiring index.js");
// const api = require('./Develop/public/assets/js/index.js');
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
app.get('/', (req, res) => {
  console.log("Starting server.js app.get");
  res.sendFile(path.join(__dirname, '/public/index.html'));
}
);

// This is for the front-end
app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Very simple get route ... to log among other things. 
// app.get('/notes', (req, res) => {
//   console.log("GET endpoint /notes ... returning notes.html file.");
//   res.sendFile(path.join(__dirname, 'public/notes.html'))
// });

// GET Route for db.json - This is for the back end
app.get('/api/notes', (req, res) =>  {
  fs.readFile('db/db.json', "utf-8", (err, data) =>  {
    if (err) {
      console.log(err);
      return;
    }
    res.json(JSON.parse(data))
  })
});
// res.sendFile(path.join(__dirname, '/db/db.json'))

// POST route to db.json - This is aslo for the back end
app.post('/api/notes', (req, res) => {
  const fileName = 'db/db.json';
  // Step 1: pull a notes object out of the input req
  console.log("The new note is " + req.body); // [object Object]
  const {title, text} = req.body;
  const newNote = {title, text, id: uuid()};
  let noteArray = [];
  console.log("New title " + title + "  New Text " + text);  // works great!
  // let noteArray = [];
  // Step 2 use the current data to create an array of current notes
  fs.readFile(fileName, "utf-8", (err, data) =>  {
    if (err) {
      console.log(err);
      res.status(500).json('Error reading data from db/db.json');
      return;
    }
    // res.json(JSON.parse(data));
    noteArray = JSON.parse(data);
    for (const note of noteArray) {
      console.log("Orig Note Title: " + note.title + " Text: " + note.text);
    }
    // Step 3 notesArray.push(newNote); 
    noteArray.push(newNote);
    let count = 1;
    for (const note of noteArray) {
        console.log(count++ + ". " + note.id + " Note Title: " + note.title + " Text: " + note.text);
    }
    // Step 4: Now write all the data (new plus old) back to the file. 
    // stringify(obj, null, 4) ?? 
    const strResult = JSON.stringify(noteArray);
    fs.writeFile(fileName, strResult, (err) => err  ? console.error(err) 
                                                    : console.info('Added new note ok.'));
  }) ; // end readFile method
  const resp = {
    status: "Sucessfully added",  // can be any text
    body: noteArray,  // works with noteArray or with newNote, but directions say return them all
  };
  console.log(resp);
  // make the final resoult 201 (created success)
  res.status(201).json(resp);

}); // end app.post method

// GET Route for feedback page
app.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
);

// BONUS: delete route that deletes one value
app.delete('/api/notes/:id', (req, res) => {
  const fileName = 'db/db.json';
  let noteArray = []; // need to declare outside of read to use after the read.

  //   // Step 1: get the id path parmeter
  const deleteID = req.params.id;
  console.log("Attempting to delete id " + deleteID);
  // const {title, text, id} = req.body; // This wont work here
  
  // Step 2 use the current data to create an array of current notes
  fs.readFile(fileName, "utf-8", (err, data) =>  {
    if (err) {
      console.log(err);
      res.status(500).json('Error reading data from db/db.json');
      return;
    }
    // res.json(JSON.parse(data));
    noteArray = JSON.parse(data);

    // Step 3 - find the note in the currentNoteArray and delete it
    // Iterate through the terms name to check if it matches `req.params.term`
    let found = false;
    for (let i=0; i<noteArray.length; i++) {
      if (noteArray[i].id == deleteID ) {
        found = true;
        console.log("Found matching note to delete ... " + i + " title " + noteArray[i].title);
        noteArray.splice(i, 1);  /// 1 => just remove one item
        //    return res.json(termData[i]);
      }
    } // end for all notes

    // Return a message if the term doesn't exist in our DB
    if (!found) {
      return res.status(404).json('No match found');
    } 
    let count = 1;
    for (const note of noteArray) {
        console.log(count++ + ". " + note.id + " Note Title: " + note.title + " Text: " + note.text);
    }

    // Step 4: Now write the modified data (old = deleted) back to the file. 
    // stringify(obj, null, 4) ?? 
    const strResult = JSON.stringify(noteArray);
    fs.writeFile(fileName, strResult, (err) => err  ? console.error(err) 
                                                    : console.info('Deleted note ok.'));
  }) ; // end readFile method
  const resp = {
    status: "Sucessfully deleted",  // can be any text
    body: noteArray,  // works with noteArray or with newNote, but directions say return them all
  };
  return res.status(200).json(resp);
  // res.status(200);
});  // end delete api/notes/:id

// Per directon Wildcard route to return index.html
// This causes all kind of havoc if it's not last!!
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`MJS App listening at http://localhost:${PORT}`)
);
