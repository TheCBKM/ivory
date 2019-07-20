const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema=mongoose.Schema({
    name:{
        required:true,
        type:String,
    },
 
    available:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('category', categorySchema);