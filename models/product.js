const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema=mongoose.Schema({
    name:{
        required:true,
        type:String,
    },
    subcategory:{
        type: Schema.Types.ObjectId,
        ref: 'subcategory',
        required: true,
        default:null
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true,
        default:null
    },
    available:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        default:0
    },
    sid:{
        type: Schema.Types.ObjectId,
        ref: 'shop',
        required: true
    },
    per:{
        type: String,
        required: true
    },
    img:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model('product', productSchema);