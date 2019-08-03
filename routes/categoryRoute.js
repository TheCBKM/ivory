const app = module.exports = require('express')();

const categoryServices = require('../services/categoryServices');
const {shopauth}= require('../middleware/auth')


app.get("/add",shopauth, (req, res) => {
    (async () => {
        try {
            res.render('add', { add: "category" })
        } catch (error) {
            console.log(error)
        }
    })();
});


app.post("/add",shopauth, (req, res) => {
    (async () => {
        try {
            params={
                sid:req.session.sid
            }
            console.log(req.body.name)
            save=req.body
            save.sid=req.session.sid
            var savePromise = await categoryServices.saveCategory(save);
            var productPromise = await categoryServices.getCategory(params);
            // res.send(productPromise)
            res.redirect("/product/view")
        } catch (error) {
            console.log(error)
        }
    })();
});

app.post("/update",shopauth, (req, res) => {
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

app.get("/update/:id",shopauth, (req, res) => {
    (async () => {
        try {
            console.log(req.body)
            var savePromise = await categoryServices.getCategorybyId(req.params.id);
            res.render("edit", { edit: "category", category: savePromise })
        } catch (error) {
            console.log(error)
        }
    })();
});

app.get("/delete/:id",shopauth, (req, res) => {
    (async () => {
        try {
            console.log(req.params.id)
            var productPromise = await  categoryServices.deleteCategoryById(req.params.id)
            res.redirect('/product/view')
        }
        catch (error) {
            console.log(error)
        }
    })();
})