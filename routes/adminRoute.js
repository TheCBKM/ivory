const app = module.exports = require('express')();

const orderServices = require('../services/orderServices');

const shopServices = require('../services/shopServices')
app.get('/shops', (req, res) => {
    (async () => {
        shopPro = await shopServices.getShops()
        console.log(shopPro)
        res.render('adminShops', shopPro)
    })();
})


app.post('/shop/details', (req, res) => {
    (async () => {

        params = {
            sid: req.body.id
        }
        console.log(params)
        ord = await orderServices.getOrder(params)
        res.json({
            data: ord,
        })
    })();

})

app.post('/login', (req, res) => {
    (async () => {
        console.log(req.body)
        if(req.body.phone=="79727780098" && req.body.pass=="admin123456"){
            res.redirect('/admin/shops')
        }
        else{
            res.send('<h1>You are not Register here <br> Call 9340573858</h1>')

        }
    })();
})
app.get('/login', (req, res) => {
    (async () => {
        res.render('login', { data: 2 })
    })();
})