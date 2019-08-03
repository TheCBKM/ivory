const coustomerSchema = require('../models/coustomer');
const mongoose = require('mongoose');

const getCoustomers = function (params) {
    return coustomerSchema.find().exec();
}
const getCoustomerbyId = function (params) {
    return coustomerSchema.findOne({ "_id": params }).exec();
}
const getCoustomerbyNumber = function (params) {
    return coustomerSchema.findOne({ "phone": params }).exec();
}
const saveCoustomer = function (productObj) {
    let prod = new coustomerSchema(productObj);
    return prod.save();
}

const deleteCoustomerById = function (prodId) {
    return coustomerSchema.deleteOne({ "_id": prodId }).exec();
}

const updateCoustomer = function (param) {
    return coustomerSchema.update({ "_id": param.id }, param).exec();
}


module.exports = {
    getCoustomers,
    getCoustomerbyId,
    saveCoustomer,
    deleteCoustomerById,
    updateCoustomer,
    getCoustomerbyNumber
}