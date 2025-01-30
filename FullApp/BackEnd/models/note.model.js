const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title: {type: String, required:true},
    description: {type: String, required:true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"user", required:true},
    user: {type: String, required:true}
}, {
    versionKey: false
})

const NoteModel = mongoose.model("note", noteSchema)

module.exports = {NoteModel}