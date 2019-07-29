const app = module.exports = require('express')();

const productServices = require('../services/productServices');
const subCategoryServices = require('../services/subCategoryServices');
const categoryServices = require('../services/categoryServices');


app.get("/view", (req, res) => {
    (async () => {
        try {
            var productPromise = await productServices.getProduct();
            var subcatPromise = await subCategoryServices.getSubCategory();
            var catPromise = await categoryServices.getCategory();
            res.render('inventory', { products: productPromise, subCategories: subcatPromise, categories: catPromise })
        } catch (error) {
            console.log(error)
        }
    })();
});

app.get("/add/:id", (req, res) => {
    (async () => {
        try {
            console.log(req.params.id)
            var productPromise = await productServices.getProductybyId(req.params.id);
            console.log(productPromise)
            res.render('addInventory', { data: { id:productPromise._id, available: productPromise.available, name: productPromise.name } })
        } catch (error) {
            console.log(error)
        }
    })();
});

app.post("/add", (req, res) => {
    (async () => {
        try {
            console.log(req.body)
            newavai=Number(req.body.available)+Number(req.body.add)
            update={
                id:req.body.id,
                available:  newavai
            }
            console.log(update)
            var productPromise = await productServices.updateProduct(update);
            res.redirect('/inventory/view')
        } catch (error) {
            console.log(error)
        }
    })();
});