const app = module.exports = require('express')();

const categoryServices = require('../services/categoryServices');


app.get("/add", (req, res) => {
    (async () => {
        try {
            res.render('add', { add: "category" })
        } catch (error) {
            console.log(error)
        }
    })();
});


app.post("/add", (req, res) => {
    (async () => {
        try {
            console.log(req.body.name)
            var savePromise = await categoryServices.saveCategory(req.body);
            var productPromise = await categoryServices.getCategory(req);
            // res.send(productPromise)
            res.redirect("/product/view")
        } catch (error) {
            console.log(error)
        }
    })();
});

app.post("/update", (req, res) => {
    (async () => {
        try {
            console.log(req.body)
            var savePromise = await categoryServices.updateCategory(req.body);
            res.redirect("/product/view")
        } catch (error) {
            console.log(error)
        }
    })();
});

app.get("/update/:id", (req, res) => {
    (async () => {
        try {
            console.log(req.body)
            var savePromise = await categoryServices.getCategorybyId(req.params.id);
            res.render("edit",{edit:"category",category:savePromise})
        } catch (error) {
            console.log(error)
        }
    })();
});