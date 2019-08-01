const orderSchema = require('../models/order');
const mongoose = require('mongoose');

const getOrder = function (params) {
    // console.log(params.user._id.toString())
    return orderSchema.find().populate('products.product').exec();
    // sort({'createdAt':-1}).skip(parseResult.skip).limit(parseResult.limit).populate('category', 'name').populate('subcategory','name').populate('company'
}   
const getOrderbyId = function (params) {
    return orderSchema.findOne({ "_id": params }).exec();
}
const saveOrder = function (productObj) {
    let prod = new orderSchema(productObj);
    return prod.save();
}
const deleteOrderById = function (prodId) {
    return orderSchema.deleteOne({ "_id": prodId }).exec();
}
const updateOrder = function (param) {
    return orderSchema.update({ "_id": param.id }, param).exec();
}


module.exports = {
    getOrder,
    getOrderbyId,
    saveOrder,
    deleteOrderById,
    updateOrder,
}