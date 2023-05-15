const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema({
    date:{
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Announcement', announcementSchema);