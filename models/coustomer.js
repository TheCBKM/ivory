const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coustomerSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    phone: {
        required: true,
        type: Number,
        length: 10,
        unique: true
    },
    address: {
        require: true,
        type: String
    },
    img: {
        require: true,
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model('coustomer', coustomerSchema);