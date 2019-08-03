const app = module.exports = require('express')();

const productServices = require('../services/productServices');
const subCategoryServices = require('../services/subCategoryServices');
const categoryServices = require('../services/categoryServices');
const transactionServices = require('../services/transactionServices');
const {shopauth}= require('../middleware/auth')

app.get('/make',shopauth, (req, res) => {
    (async () => {
        try {
            params={
                sid:req.session.sid
            }
            console.log(req.session)
            var productPromise = await productServices.getProduct(params);
            // console.log(productPromise)
            res.render('bill', { data: productPromise })
        }
        catch (error) {
            console.log(error)
        }
    })();
})

app.post('/trans',shopauth, (req, res) => {
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
            save=req.body;
            save.sid=req.session.sid
            var productPromise = await transactionServices.saveTransaction(save);
            res.send({ data: productPromise, success: true })
        }
        catch (error) {
            console.log(error)
        }
    })();
})
app.get('/view',shopauth, (req, res) => {
    (async () => {
        try {
            params={
                sid:req.session.sid
            }
            console.log("trans")
            var productPromise = await transactionServices.getTransaction(params);
            console.log(productPromise)
            res.send(productPromise)
        }
        catch (error) {
            console.log(error)
        }
    })();
})
app.get('/trans',shopauth, (req, res) => {
    (async () => {
        try {
            params={
                sid:req.session.sid
            }
            var productPromise = await transactionServices.getTransaction(params);
            console.log(productPromise)
            res.render('transactionview', { data: productPromise })
            // res.send(productPromise)
        }
        catch (error) {
            console.log(error)
        }
    })();
})

app.get('/trans/delete/:id',shopauth, (req, res) => {
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