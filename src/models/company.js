const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contractTypes: {
        type: [Number],
        required: true
    }
});

module.exports = mongoose.model('Company', companySchema);