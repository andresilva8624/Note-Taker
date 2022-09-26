const router = require("express").Router();
const { notes } = require("../db/db.json");
const { updateDB, createNewNote} = require("../lib/notes");
const { v4: uuidv4 } = require("uuid");

router.get("/notes", (req, res) => {
  res.json(notes);
});

router.post("/notes", (req, res) => {
  req.body.id = uuidv4();
  res.json(createNewNote(req.body, notes));
});

router.delete("/notes/:id", (req, res) => {
  const params = req.params.id;
  updateDB(params, notes);
  res.redirect("")
 
});

module.exports = router;
