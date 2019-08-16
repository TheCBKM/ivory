const productSchema = require('../models/product');
const mongoose = require('mongoose');

const getProduct = function (params) {
    console.log((params.sid.toString()))
    return productSchema.find({ sid: mongoose.Types.ObjectId(params.sid.toString()) }).sort({ createdAt: -1 }).exec();
    // sort({'createdAt':-1}).skip(parseResult.skip).limit(parseResult.limit).populate('category', 'name').populate('subcategory','name').populate('company'
}
const getProductybyId = function (params) {
    return productSchema.findOne({ "_id": params }).exec();
}
const saveProduct = function (productObj) {
    let prod = new productSchema(productObj);
    return prod.save();
}
const deleteProductById = function (prodId) {
    return productSchema.deleteOne({ "_id": prodId }).exec();
}
const updateProduct = function (param) {
    return productSchema.updateOne({ "_id": param.id }, param).exec();
}

module.exports = {
    getProduct,
    saveProduct,
    deleteProductById,
    updateProduct,
    getProductybyId,
}