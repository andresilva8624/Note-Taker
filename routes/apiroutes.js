const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils.js')
const notes = require('express').Router();
const uuid  = require('../helpers/uuid.js')


notes.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
    // Refer to folder 22 Solved, route/note.js //
});

notes.post('/notes', (req, res) => {


    const { title, text, } = req.body;
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
});

    notes.delete('/notes/:note_id', (req, res) => {
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
module.exports = notes;