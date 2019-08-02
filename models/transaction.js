const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = mongoose.Schema({
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
    phone:{
        type:Number
    }

},{timestamps:true})

module.exports = mongoose.model('transaction', transactionSchema);