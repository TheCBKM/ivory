const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subCategorySchema=mongoose.Schema({
    name:{
        required:true,
        type:String,
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    },
    sid:{
        type: Schema.Types.ObjectId,
        ref: 'shop',
        required: true
    }
   
},{timestamps:true})

module.exports = mongoose.model('subcategory', subCategorySchema);