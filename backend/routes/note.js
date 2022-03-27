const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Get all the notes : GET "/api/note/fetchallnotes". No login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const note = await Note.find({ user: req.user.id });
  res.json(note);
});

//ROUTE 2: add new note : POST "/api/note/addnote". No login required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 charachters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are errors return bad req and error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Something went wrong !");
    }
  }
);

//ROUTE 3: update existing note : PUT "/api/note/updatenote". No login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find note to be updated
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found!");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed!");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.log(error);
    console.error(error.message);
    res.status(500).send("Something went wrong !");
  }
});

//ROUTE 4: delete existing note : DELETE "/api/note/deletenote". No login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    //find note to be deleted
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found!");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed!");
    }

    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ Success: "Note deleted successfully!!", note: note });
  } catch (error) {
    console.log(error);
    console.error(error.message);
    res.status(500).send("Something went wrong !");
  }
});

module.exports = router;
