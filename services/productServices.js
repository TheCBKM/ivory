const productSchema = require('../models/product');
const mongoose = require('mongoose');

const getProduct = function (params) {
    // console.log(params.user._id.toString())
    return productSchema.find().exec();
    // sort({'createdAt':-1}).skip(parseResult.skip).limit(parseResult.limit).populate('category', 'name').populate('subcategory','name').populate('company'
}
const getProductybyId = function (params) {
    return productSchema.findOne({"_id":params}).exec();
}
const saveProduct = function (productObj) {
    let prod = new productSchema(productObj);
    return prod.save();
}

const deleteProductById = function (prodId) {
    return productSchema.deleteOne({ "_id": prodId }).exec();
}
const updateProduct = function (param) {
    return productSchema.update({ "_id": param.id }, param).exec();
}


module.exports={
    getProduct,
    saveProduct,
    deleteProductById,
    updateProduct,
    getProductybyId,
}