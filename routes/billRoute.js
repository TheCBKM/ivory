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

            console.log(req.body)
            req.body.products.map(p => {
                (async () => {
                    pro = {
                        id: p.product,
                        available: p.available
                    }
                    var productPromise = await productServices.updateProduct(pro);
                })();


            })
            var productPromise = await transactionServices.saveTransaction(req.body);
            res.send({ data: productPromise, success: true })
        }
        catch (error) {
            console.log(error)
        }
    })();
})
app.get('/view', (req, res) => {
    (async () => {
        try {
            console.log("trans")
            var productPromise = await transactionServices.getTransaction();
            console.log(productPromise)
            res.send(productPromise)
        }
        catch (error) {
            console.log(error)
        }
    })();
})
app.get('/trans', (req, res) => {
    (async () => {
        try {
            var productPromise = await transactionServices.getTransaction();
            console.log(productPromise)
            res.render('transactionview', { data: productPromise })
            // res.send(productPromise)
        }
        catch (error) {
            console.log(error)
        }
    })();
})

app.get('/trans/delete/:id', (req, res) => {
    (async () => {
        try {
            var productPromise = await transactionServices.deleteTransactionById(req.params.id);
            res.redirect('/bill/trans')
        }
        catch (error) {
            console.log(error)
        }
    })();
})