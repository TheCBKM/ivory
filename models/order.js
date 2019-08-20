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
    sid: {
        type: Schema.Types.ObjectId,
        ref: 'shop',
        required: true
    },
    cid: {
        type: Schema.Types.ObjectId,
        ref: 'coustomer',
        required: true
    },
    oid:{
        type:String,
        required: true,
        unique:true
    },
    rating:{
        type:Number,
        default:2.5
    }

}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema);