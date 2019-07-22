const transactionSchema = require('../models/product');
const mongoose = require('mongoose');

const getTransaction = function (params) {
    // console.log(params.user._id.toString())
    return transactionSchema.find().exec();
    // sort({'createdAt':-1}).skip(parseResult.skip).limit(parseResult.limit).populate('category', 'name').populate('subcategory','name').populate('company'
}
const getTransactionbyId = function (params) {
    return transactionSchema.findOne({"_id":params}).exec();
}
const saveTransaction = function (productObj) {
    let prod = new transactionSchema(productObj);
    return prod.save();
}

const deleteTransactionById = function (prodId) {
    return transactionSchema.deleteOne({ "_id": prodId }).exec();
}
const updateTransaction = function (param) {
    return productSchema.update({ "_id": param.id }, param).exec();
}


module.exports={
    getTransaction,
    getTransactionbyId,
    saveTransaction,
    deleteTransactionById,
    updateTransaction,
}