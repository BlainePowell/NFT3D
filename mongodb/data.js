
const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'please add a title'],
        unique: true,
        trim: true, // may not need
        maxlength: [40, "Title cannot be more than 40 characters"]
    },
    description: {
        type: String,
        required: true,
        maxlength: [200, "Cannot exceed 200 characters"]
    }
})

module.exports = mongoose.models.Note || mongoose.model('Note',
NoteSchema);