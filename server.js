const express = require('express');

const { notes } = require('./db/notes');

const PORT = process.env.PORT || 3001;
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.get('/db/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(notes);
  });

app.listen(PORT, () => {
console.log(`API server now on port ${PORT}!`);
});  