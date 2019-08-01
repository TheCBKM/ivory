const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
    products: [{

        product: {
            type: Schema.Types.ObjectId,
            ref: 'product',
        },
        quantity: {
            type: Number
        },
    }],
    price: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 0
        //0-active 1-sold 2-cancel
    },

},{timestamps:true})

module.exports = mongoose.model('order', orderSchema);