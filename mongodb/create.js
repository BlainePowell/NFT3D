const mongoose = require('mongoose');


const CreateSchema = new mongoose.Schema({
    asset: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    blockchain: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

module.exports = mongoose.models.Create || mongoose.model('Create', CreateSchema);