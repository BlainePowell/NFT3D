const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    signature: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);