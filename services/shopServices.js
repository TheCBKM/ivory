const shopSchema = require('../models/shop');
const mongoose = require('mongoose');

const getShops = function (params) {
    return shopSchema.find().exec();
}
const getShopbyId = function (params) {
    return shopSchema.findOne({ "_id": params }).exec();
}
const getShopbyNumber = function (params) {
    return shopSchema.findOne({ "phone": params }).exec();
}
const saveShop = function (productObj) {
    let prod = new shopSchema(productObj);
    return prod.save();
}

const deleteShopById = function (prodId) {
    return shopSchema.deleteOne({ "_id": prodId }).exec();
}

const updateShop = function (param) {
    return shopSchema.update({ "_id": param.id }, param).exec();
}


module.exports = {
    getShops,
    getShopbyId,
    getShopbyNumber,
    saveShop,
    deleteShopById,
    updateShop
}