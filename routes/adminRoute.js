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