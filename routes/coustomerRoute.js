const app = module.exports = require('express')();

const coustomerServices = require('../services/coustomerServices');



app.post("/login", (req, res) => {
    (async () => {
        try {
            coustomerPromise = await coustomerServices.getCoustomerbyNumber(Number(req.body.phone));
            if (coustomerPromise) {
                req.session.cid = coustomerPromise._id
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