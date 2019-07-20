const app = module.exports = require('express')();

const categoryServices = require('../services/categoryServices');
const subCategoryServices = require('../services/subCategoryServices');



app.get("/add", (req, res) => {
    (async () => {
        try {
            var productPromise = await categoryServices.getCategory(req);
            res.render('add', { add: "subcategory",categories:productPromise})
        } catch (error) {
            console.log(error)
        }
    })();
});

app.post("/add", (req, res) => {
    (async () => {
        try {
            console.log(req.body)
            var savePromise = await subCategoryServices.saveSubCategory(req.body);
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
            var savePromise = await subCategoryServices.updateSubCategory(req.body);
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
            var savePromise = await subCategoryServices.getSubCategorybyId(req.params.id);
            res.render("edit",{edit:"subcategory",subcategory:savePromise})
        } catch (error) {
            console.log(error)
        }
    })();
});