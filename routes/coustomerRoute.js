const app = module.exports = require('express')();

const coustomerServices = require('../services/coustomerServices');
const orderServices = require('../services/orderServices');
const { coustomerauth } = require('../middleware/auth')

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
// const imageminPngquant = require('imagemin-pngquant');
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        f = file.originalname.split('.')
        f = Date.now() + "." + f[f.length - 1]
        cb(null, f)
        req.body.img = f
        console.log(f)

    }
})
var upload = multer({ storage: storage })


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

app.post('/register', upload.single('file'), (req, res) => {
    (async () => {
        console.log(req.body)
        coustomerPromise = await coustomerServices.saveCoustomer(req.body);
        req.session.cid = coustomerPromise._id
        const files = await imagemin([`uploads/${req.body.f}`], {
            destination: 'uploads',
            plugins: [
                imageminJpegtran(),
            ]
        });

        console.log(files);
        res.redirect('/coustomer/login')
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


app.get('/orders', coustomerauth, (req, res) => {
    (async () => {
        try {
            console.log("trans")
            var productPromise = await orderServices.getOrderbyCoustomer(req.session.cid);
            console.log(productPromise)
            // res.send(productPromise)
            res.render('coustomerOrders', { data: productPromise, profile: req.session.coustomer })
        }
        catch (error) {
            console.log(error)
        }
    })();
})

app.get('/getall', (req, res) => {
    (async () => {
        try {
            console.log("trans")
            var productPromise = await coustomerServices.getCoustomers();
            console.log(productPromise)
            res.send(productPromise)
            // res.render('coustomerOrders', { data: productPromise,profile:req.session.coustomer })
        }
        catch (error) {
            console.log(error)
        }
    })();
})