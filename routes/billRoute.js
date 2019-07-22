const app = module.exports = require('express')();

const productServices = require('../services/productServices');
const subCategoryServices = require('../services/subCategoryServices');
const categoryServices = require('../services/categoryServices');


app.get('/make', (req, res) => {
    (async () => {
        try{
            var productPromise = await productServices.getProduct();
           console.log(productPromise)
            res.render('bill',{data:productPromise})    
        }
        catch(error){
            console.log(error)
        }
    })();
})