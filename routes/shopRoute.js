const app = module.exports = require('express')();

const shopServices = require('../services/shopServices');



app.post("/login", (req, res) => {
    (async () => {
        try {
            coustomerPromise = await shopServices.getShopbyNumber(Number(req.body.phone));
            if (coustomerPromise) {
                req.session.sid = coustomerPromise._id
                res.redirect('/product/view')
            }
            else
                res.render('register', { number: req.params.number, data: 1 })
        } catch (error) {
            console.log(error)
        }
    })();
});
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

app.get('/login', (req, res) => {
    (async () => {
        res.render('login', { data: 1 })
    })();
})

app.post('/register', (req, res) => {
    (async () => {
        console.log(req.body)
        coustomerPromise = await shopServices.saveShop(req.body);
        req.session.sid = coustomerPromise._id
        res.redirect('/product/view')
    })();

})