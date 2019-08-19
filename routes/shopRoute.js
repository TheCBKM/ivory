const app = module.exports = require('express')();

const shopServices = require('../services/shopServices');

const multer = require('multer')




app.post("/login", (req, res) => {
    (async () => {
        try {
            coustomerPromise = await shopServices.getShopbyNumber(Number(req.body.phone));
            if (coustomerPromise) {
                req.session.sid = coustomerPromise._id
                res.redirect('/inventory/view')
            }
            else
                res.send('<h1>You are not Register here <br> Call 9340573858</h1>')
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




var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        console.log("wow")
        f = file.originalname.split('.')
        f = Date.now() + "." + f[f.length - 1]
        cb(null, f)
        req.body.img = f
        console.log(f)


    }
})
var upload = multer({ storage: storage })

app.post('/register', upload.single('file'), (req, res) => {
    (async () => {
        console.log(req.body)
        coustomerPromise = await shopServices.saveShop(req.body);
        req.session.sid = coustomerPromise._id
        res.redirect('/product/view')
    })();

})


app.get('/getall', (req, res) => {
    (async () => {
        try {
            console.log("trans")
            var productPromise = await shopServices.getShops();
            console.log(productPromise)
            res.send(productPromise)
            // res.render('coustomerOrders', { data: productPromise,profile:req.session.coustomer })
        }
        catch (error) {
            console.log(error)
        }
    })();
})


app.get('/reg', (req, res) => {
    res.render('register', { number: req.params.number, data: 1 })
})