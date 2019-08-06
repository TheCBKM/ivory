const app = module.exports = require('express')();

const coustomerServices = require('../services/coustomerServices');
const orderServices = require('../services/orderServices');
const {coustomerauth}= require('../middleware/auth')



app.post("/login", (req, res) => {
    (async () => {
        try {
            coustomerPromise = await coustomerServices.getCoustomerbyNumber(Number(req.body.phone));
            if (coustomerPromise) {
                req.session.cid = coustomerPromise._id
                req.session.coustomer = coustomerPromise
                res.redirect('/order/shopshow')
            }
            else
                res.render('register', { number: req.params.number, data: 0 })
        } catch (error) {
            console.log(error)
        }
    })();
});

app.get('/login', (req, res) => {
    (async () => {
        res.render('login', { data: 0 })
    })();
})

app.post('/register', (req, res) => {
    (async () => {
        console.log(req.body)
        coustomerPromise = await coustomerServices.saveCoustomer(req.body);
        req.session.cid = coustomerPromise._id
        res.redirect('/order/shopshow')
    })();

})

app.get('/logout', (req, res) => {
    (async () => {
        try {
            req.session.destroy();
            res.redirect('login')
        }
        catch (err) {
            console.log(err)
        }
    })();
})


app.get('/orders',coustomerauth, (req, res) => {
    (async () => {
        try {           
            console.log("trans")
            var productPromise = await orderServices.getOrderbyCoustomer(req.session.cid);
            console.log(productPromise)
            // res.send(productPromise)
            res.render('coustomerOrders', { data: productPromise,profile:req.session.coustomer })
        }
        catch (error) {
            console.log(error)
        }
    })();
})