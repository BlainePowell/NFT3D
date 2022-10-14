
const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: [1000, "Cannot exceed 250 characters"]
    },
    description: {
        type: String,
        required: true,
        maxlength: [1000, "Cannot exceed 250 characters"]
    },
})

module.exports = mongoose.models.Note || mongoose.model('Note',
NoteSchema);