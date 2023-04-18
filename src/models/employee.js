const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    DNI: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    contract: {
        type: Number,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Employee', employeeSchema);