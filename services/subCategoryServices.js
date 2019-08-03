const subCategorySchema = require('../models/subCategory');
const mongoose = require('mongoose');

const getSubCategory = function (params) {
    return subCategorySchema.find({ sid: mongoose.Types.ObjectId(params.sid.toString()) }).exec();
}

const getSubCategorybyId = function (params) {
    console.log(params)
    return subCategorySchema.findOne({"_id":params}).exec();
}

const saveSubCategory = function (productObj) {
    let prod = new subCategorySchema(productObj);
    return prod.save();
}

const deleteSubCategoryById = function (prodId) {
    return subCategorySchema.deleteOne({ "_id": prodId }).exec();
}

const updateSubCategory = function (param) {

    return subCategorySchema.update({ "_id": param.id }, param).exec();
}


module.exports={
    getSubCategory,
    saveSubCategory,
    deleteSubCategoryById,
    updateSubCategory,
    getSubCategorybyId
}