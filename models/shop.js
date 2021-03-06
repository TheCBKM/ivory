const mongoose = require('mongoose');


const shopSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    phone: {
        required: true,
        type: Number,
        length: 10,

    },
    address: {
        require: true,
        type: String
    },
    img: {
        require: true,
        type: String
    },
    commission:{
        require:true,
        type:Number
    }

}, { timestamps: true })

module.exports = mongoose.model('shop', shopSchema);