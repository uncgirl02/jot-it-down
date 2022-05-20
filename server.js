const fs = require('fs');
const path = require('path');
const express = require('express');

const { v4: uuidv4 } = require('uuid');
uuidv4();

const notes = require('./db/db.json');
const { json } = require('express/lib/response');

const PORT = process.env.PORT || 3001;
const app = express();
//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

function createNewNote(body, notesArray) {
  notesArray = notes.notes
  const newNote = body;
  newNote.id = uuidv4();
  notesArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return newNote;
}


function validateNote() {
  if (!notes.title || typeof notes.title !== 'string') {
    return false;
  }
  if (!notes.text || typeof notes.text !== 'string') {
  return false;
  }
  return true;
};



app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(notes.notes);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/api/notes', (req, res) => {
  var newNotes = createNewNote(req.body);
  validateNote(req.body);
  res.json(newNotes);
})


// app.delete(`/api/notes/:id`, (req, res) => {
//   const idToDelete = req.params.id;
//   console.log (idToDelete);
  
//   const newNotesArray = notes.notes.filter(notes => {
//     // check if id of current note is the same as the id of the note to be deleted, if it is not, then return true
//     notes.id !== idToDelete
//   });
//   console.log(newNotesArray);


//   fs.writeFileSync("./db/db.json", JSON.stringify(newNotesArray), 
//   (err) => {
//     if (err) throw err;
//   });
//   // response.json(newNotesArray);
// });

    
app.listen(PORT, () => {
console.log(`API server now on port ${PORT}!`);
}); 