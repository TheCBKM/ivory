const app = module.exports = require('express')();

const productServices = require('../services/productServices');
const subCategoryServices = require('../services/subCategoryServices');
const categoryServices = require('../services/categoryServices');
const orderServices = require('../services/orderServices');
const transactionServices = require('../services/transactionServices');

const shopServices = require('../services/shopServices');
const coustomerServices = require('../services/coustomerServices');

const {shopauth,coustomerauth}= require('../middleware/auth')


app.get('/make/:id',coustomerauth, (req, res) => {
    (async () => {
        try {
            params = {
                sid: req.params.id
            }
            console.log(params.sid)
            var productPromise = await productServices.getProduct(params);
            console.log(productPromise)
            res.render('order', { data: productPromise })
        }
        catch (error) {
            console.log(error)
        }
    })();
})

app.post('/trans',coustomerauth, (req, res) => {
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
            save = req.body
            save.sid = req.session.sid
            save.cid=req.session.cid
            var productPromise = await orderServices.saveOrder(save);
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
            params = {
                sid: req.session.sid
            }
            console.log("trans")
            var productPromise = await orderServices.getOrder(params);
            console.log(productPromise)
            res.send(productPromise)
        }
        catch (error) {
            console.log(error)
        }
    })();
})
app.get('/trans/:id',shopauth, (req, res) => {
    (async () => {
        try {
            params = {
                sid: req.session.sid
            }
            var productPromise = await orderServices.getOrder(params);
            productPromise = productPromise.filter(p => {
                return p.status == Number(req.params.id)
            })
            console.log(productPromise)
            res.render('ordersView', { data: productPromise, status: Number(req.params.id) })
            // console.log(Number(req.params.id))
            // res.send(productPromise)
        }
        catch (error) {
            console.log(error)
        }
    })();
})

app.get('/sold/:id',shopauth, (req, res) => {
    (async () => {
        try {
            order = {
                id: req.params.id,
                status: 1
            }
            var productPromise = await orderServices.updateOrder(order);
            var productPromise = await orderServices.getOrderbyId(req.params.id)
            console.log(productPromise)
            newTrans = {
                products: productPromise.products,
                price: productPromise.price,
                sid: req.session.sid
            }

            var productPromise = await transactionServices.saveTransaction(newTrans);

            console.log(productPromise)
            res.redirect('/order/trans/0')
            // res.send(productPromise)
        }
        catch (error) {
            console.log(error)
        }
    })();
})

app.get('/cancel/:id',shopauth, (req, res) => {
    (async () => {
        try {
            var productPromise = await orderServices.getOrderbyId(req.params.id);

            console.log(req.body)
            productPromise.products.map(p => {

                (async () => {
                    var prod = await productServices.getProductybyId(p.product);
                    console.log(prod)

                    pro = {
                        id: p.product,
                        available: p.quantity + prod.available
                    }
                    console.log(pro)
                    var productPromise = await productServices.updateProduct(pro);
                })();


            })
            order = {
                id: req.params.id,
                status: 2
            }
            var productPromise = await orderServices.updateOrder(order);
            res.send({ data: productPromise, success: true })
        }
        catch (error) {
            console.log(error)
        }
    })();
})

app.get('/trans/delete/:id',shopauth, (req, res) => {
    (async () => {
        try {
            var productPromise = await orderServices.deleteOrderById(req.params.id);
            res.redirect(`/order/trans/0`)
        }
        catch (error) {
            console.log(error)
        }
    })();
})


app.get('/shopshow',coustomerauth, (req, res) => {
    (async () => {
        try {
            coustPromise=await coustomerServices.getCoustomerbyId(req.session.cid)
            shopPromise = await shopServices.getShops()
            res.render('showshop',{data:shopPromise,profile:coustPromise})
        }
        catch (error) {
            console.log(error)
        }
    })();
})