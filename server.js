const express = require('express');
const notes = require('express').Router();
const path = require('path');
const { readFromFile, readAndAppend, writeToFile } = require('./helpers/fsUtils.js');
const uuid = require('./helpers/uuid.js');



const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
  // Refer to folder 22 Solved, route/note.js //
});

app.post('/api/notes', (req, res) => {


  const { title, text } = req.body;
  console.log(req.body)
  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  };



  app.delete('api/notes/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all notes except the one with the ID provided in the URL
        const result = json.filter((note) => note.note_id !== noteId);

        // Save that array to the filesystem
        writeToFile('./db/db.json', result);

        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
  });

});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);



app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

module.exports = notes;

