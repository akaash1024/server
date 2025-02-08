const Note = require("../models/note.model");

const getNote = async (req, res) => {
  try {
    const notes = await Note.find({});
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
};

const addNote = async (req, res) => {
  console.log(req.body);

  try {
    const newNote = new Note(req.body);
    await newNote.save();
    res.status(200).json({ msg: "Note created Successfully!" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
};

const updateNote = async (req, res) => {
  const { noteId } = req.params;

  try {
    const note = await Note.findOne({ _id: noteId });
    console.log(note.userId.toString());
    console.log(req.body.userId);
    if (note.userId.toString() === req.body.userId) {      
      await Note.findByIdAndUpdate({ _id: noteId }, req.body);
      console.log("updated successfully")
      res
        .status(200)
        .json({ msg: `The note with ID: ${noteId} has been updated` });
    } else {
      res
        .status(400)
        .json({ msg: "You are not authorised to perform this task!" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  try {
    const note = await Note.findOne({ _id: noteId });
    if (note.userId.toString() === req.body.userId) {
      await Note.findByIdAndDelete({ _id: noteId });
      res
        .status(200)
        .json({ msg: `The note with ID: ${noteId} has been deleted` });
    } else {
      res
        .status(400)
        .json({ msg: "You are not authorised to perform this task!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getNote, addNote, updateNote, deleteNote };
