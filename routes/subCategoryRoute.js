const app = module.exports = require('express')();

const categoryServices = require('../services/categoryServices');
const subCategoryServices = require('../services/subCategoryServices');

const {shopauth}= require('../middleware/auth')


app.get("/add",shopauth, (req, res) => {
    (async () => {
        try {
            params={
                sid:req.session.sid
            }
            var productPromise = await categoryServices.getCategory(params);
            res.render('add', { add: "subcategory",categories:productPromise})
        } catch (error) {
            console.log(error)
        }
    })();
});

app.post("/add",shopauth, (req, res) => {
    (async () => {
        try {
            console.log(req.body)
            save=req.body
            save.sid=req.session.sid
            console.log(save)
            var savePromise = await subCategoryServices.saveSubCategory(save);
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
            var savePromise = await subCategoryServices.updateSubCategory(req.body);
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
            var savePromise = await subCategoryServices.getSubCategorybyId(req.params.id);
            res.render("edit",{edit:"subcategory",subcategory:savePromise})
        } catch (error) {
            console.log(error)
        }
    })();
});

app.get("/delete/:id",shopauth, (req, res) => {
    (async () => {
        try {
            console.log(req.params.id)
            var productPromise = await  subCategoryServices.deleteSubCategoryById(req.params.id)
            res.redirect('/product/view')
        }
        catch (error) {
            console.log(error)
        }
    })();
})