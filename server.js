const fs = require('fs');
const path = require('path');
const express = require('express');

const { v4: uuidv4 } = require('uuid');
uuidv4();

const notes = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();
//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

function createNewNote(body, notesArray) {
  notesArray = (notes) ? notesArray = notes.notes : notesArray = [];
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

//function deleteNote() {
//   //get id of deleted note
//   // const deletedNoteId = req.params.id
//   const noteId  = req.params.id.toString()
 
//   //loop through array of notes
//   for (let i = 0; i < notesArray.length; i++) {
//     if( noteId === notes.notes.id) {
//       const parsedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
//       const newArray = parsedNotes.filter( notes => notes.notes.id.toString() !== deletedNoteId );
//       fs.writeFileSync('./db/db.json', JSON.stringify(newArray));
//     }
//   }
//   return newArray;
// }

//   const { id } = req.params;
//   const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));

//   const noteToDelete = notes.findIndex(note => note.note_id === id);

//   notes.splice(noteToDelete, 1);

//   writeToFile("./db/db.json", notes);
//   return res.send();
// };

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


app.delete(`/api/notes/:id`, (req, res) => {

  fs.readFile("./db/db.json", "utf8", (err, notes) => {
    if (err) throw err;
  const allNotes = JSON.parse(notes)
  const noteToDelete = req.params.id;
  console.log (req.params.id)
  })
  
  const newNotesArray = allNotes.filter(note =>
    notes.notes.id != noteToDelete);

  fs.writeFileSync(__dirname + "/../db/db.json", newNotesArray, (err) => {
    if (err) throw err;
  });

  res.json(result);
});

    
app.listen(PORT, () => {
console.log(`API server now on port ${PORT}!`);
});  