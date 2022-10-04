const express = require('express');
const notes = require('express').Router();
const path = require('path');
const { readFromFile, readAndAppend, writeToFile } = require('./helpers/fsUtils.js');
const uuid = require('./helpers/uuid.js');
const api = require('./routes/apiroutes');


const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);



app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);



app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

module.exports = notes;

