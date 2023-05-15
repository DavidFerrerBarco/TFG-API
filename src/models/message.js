const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Message', messageSchema);