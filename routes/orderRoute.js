const app = module.exports = require('express')();

const productServices = require('../services/productServices');
const subCategoryServices = require('../services/subCategoryServices');
const categoryServices = require('../services/categoryServices');
const orderServices = require('../services/orderServices');

app.get('/make', (req, res) => {
    (async () => {
        try {
            var productPromise = await productServices.getProduct();
            // console.log(productPromise)
            res.render('order', { data: productPromise })
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
            var productPromise = await orderServices.saveOrder(req.body);
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
            var productPromise = await orderServices.getOrder();
            console.log(productPromise)
            res.send(productPromise)
        }
        catch (error) {
            console.log(error)
        }
    })();
})
app.get('/trans/:id', (req, res) => {
    (async () => {
        try {
            var productPromise = await orderServices.getOrder();
            productPromise=productPromise.filter(p=>{
                return p.status==Number(req.params.id)
            })
            res.render('ordersView', { data: productPromise,status: Number(req.params.id)})
            // console.log(Number(req.params.id))
            // res.send(productPromise)
        }
        catch (error) {
            console.log(error)
        }
    })();
})

app.get('/sold/:id', (req, res) => {
    (async () => {
        try {
            order={
                id:req.params.id,
                status:1
            }
            var productPromise = await orderServices.updateOrder(order);
            console.log(productPromise)
           res.redirect('/order/trans/0')
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
            var productPromise = await orderServices.deleteOrderById(req.params.id);
            res.redirect('/order/trans/0')
        }
        catch (error) {
            console.log(error)
        }
    })();
})