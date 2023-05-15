const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
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
    }
})

module.exports = mongoose.model('News', newsSchema);