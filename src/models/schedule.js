const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    employee: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    hours: {
        type: String,
        required: true
    },
    hoursCount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Schedule', scheduleSchema);