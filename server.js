const express = require('express');
const path = require('path');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils.js');



const app = express();
const PORT = 3001;

app.use(express.static('public'));


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req,res) =>{
  readFromFile('./db/db.json').then((data) =>res.json(JSON.parse(data)))
    // Refer to folder 22 Solved, route/tip.js //
})

app.post('/api/notes', (req,res) => {


  const { title, text } = req.body;
console.log(req.body)
  if (req.body) {
    const newNote = {
      title,
      text,
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);



app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

