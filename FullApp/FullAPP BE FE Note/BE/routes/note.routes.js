const Note = require("../models/note.model");

const noteRoute = require("express").Router();
const noteController = require("../controller/note.controller");
const auth = require("../middleware/auth.middleware");


noteRoute.route("/").get(auth, noteController.getNote);
noteRoute.route("/add").post(auth, noteController.addNote);
noteRoute.route("/update/:noteId").patch(auth, noteController.updateNote);
noteRoute.route("/delete/:noteId").delete(auth, noteController.deleteNote);

module.exports = noteRoute;
