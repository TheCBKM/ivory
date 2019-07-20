const categorySchema = require('../models/category');
const mongoose = require('mongoose');

const getCategory = function (params) {
    return categorySchema.find().exec();
}
const getCategorybyId = function (params) {
    return categorySchema.findOne({ "_id": params }).exec();
}
const saveCategory = function (productObj) {
    let prod = new categorySchema(productObj);
    return prod.save();
}

const deleteCategoryById = function (prodId) {
    return categorySchema.deleteOne({ "_id": prodId }).exec();
}

const updateCategory = function (param) {
    return categorySchema.update({ "_id": param.id }, param).exec();
}


module.exports = {
    getCategory,
    saveCategory,
    deleteCategoryById,
    updateCategory,
    getCategorybyId
}