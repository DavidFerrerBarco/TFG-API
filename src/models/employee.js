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
        required: false
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
        required: false,
        default: false
    },
    image: {
        type: String,
        required: false,
        default: './default.jpg'
    }
});

module.exports = mongoose.model('Employee', employeeSchema);