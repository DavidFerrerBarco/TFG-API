const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
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
    employee: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Request', requestSchema);