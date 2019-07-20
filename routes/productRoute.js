const app = module.exports = require('express')();

const productServices = require('../services/productServices');
const subCategoryServices = require('../services/subCategoryServices');
const categoryServices = require('../services/categoryServices');




app.get("/add", (req, res) => {
    (async () => {
        try {
            var productPromise = await subCategoryServices.getSubCategory(req);
            res.render('add', { add: "product", subcategories: productPromise })
        } catch (error) {
            console.log(error)
        }
    })();
});


app.post("/add", (req, res) => {
    (async () => {
        try {
            console.log(req.body)
            var subPromise = await subCategoryServices.getSubCategorybyId(req.body.subcategory);
            product = req.body;
            console.log(subPromise)

            product.category = subPromise.category
            console.log(product)
            var savePromise = await productServices.saveProduct(product);
            var productPromise = await productServices.getProduct();
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
            var savePromise = await productServices.updateProduct(req.body);
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
            var savePromise = await productServices.getProductybyId(req.params.id);
            res.render("edit",{edit:"product",product:savePromise})
        } catch (error) {
            console.log(error)
        }
    })();
});

app.get("/view", (req, res) => {
    (async () => {
        try {
            var productPromise = await productServices.getProduct();
            var subcatPromise = await subCategoryServices.getSubCategory();
            var catPromise = await categoryServices.getCategory();
            res.render('viewall', { products: productPromise, subCategories: subcatPromise, categories: catPromise })
        } catch (error) {
            console.log(error)
        }
    })();
});


app.get("/addhere/:id/:name/:var", (req, res) => {
    (async () => {
        try {
            console.log(req.params);
            if(req.params.var=="subcategory")
            res.render('add', { add: "subcategory"+"add", id: req.params.id,name:req.params.name })
            else if(req.params.var=="product")
            res.render('add', { add: "product"+"add", id: req.params.id,name:req.params.name })                      
        } catch (error) {
            console.log(error)
        }
    })();
});

