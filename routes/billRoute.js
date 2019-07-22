const app = module.exports = require('express')();

const productServices = require('../services/productServices');
const subCategoryServices = require('../services/subCategoryServices');
const categoryServices = require('../services/categoryServices');
const transactionServices = require('../services/transactionServices');


app.get('/make', (req, res) => {
    (async () => {
        try {
            var productPromise = await productServices.getProduct();
            // console.log(productPromise)
            res.render('bill', { data: productPromise })
        }
        catch (error) {
            console.log(error)
        }
    })();
})

app.post('/trans', (req, res) => {
    (async () => {
        try {
            
            data={products:req.body}
            console.log(data)
            var productPromise = await transactionServices.saveTransaction(data);
            res.send(productPromise)

        }
        catch (error) {
            console.log(error)
        }
    })();
})