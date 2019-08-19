const app = module.exports = require('express')();

const productServices = require('../services/productServices');
const subCategoryServices = require('../services/subCategoryServices');
const categoryServices = require('../services/categoryServices');
const { shopauth } = require('../middleware/auth')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        f=file.originalname.split('.')
        f=Date.now()+"."+f[f.length-1]
      cb(null,f)
      req.body.filename=f
   console.log(f)
      
    }
  })
  var upload = multer({ storage: storage })
app.get("/add", shopauth, (req, res) => {
    (async () => {
        try {
            params = {
                sid: req.session.sid
            }
            var productPromise = await subCategoryServices.getSubCategory(params);
            res.render('add', { add: "product", subcategories: productPromise })
        } catch (error) {
            console.log(error)
        }
    })();
});


app.post("/add", upload.single('file'), shopauth, (req, res) => {
    (async () => {
        try {
         console.log(req.body.filename)
            console.log(req.body)
            var subPromise = await subCategoryServices.getSubCategorybyId(req.body.subcategory);
            product = req.body;
            product.img=req.body.filename
            console.log(subPromise)

            product.category = subPromise.category
            product.sid =req.session.sid
                console.log(product)
            var savePromise = await productServices.saveProduct(product);

            res.redirect("/product/view")
        } catch (error) {
            console.log(error)
        }
    })();
});




app.post("/update", shopauth, (req, res) => {
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

app.get("/update/:id", shopauth, (req, res) => {
    (async () => {
        try {
            console.log(req.body)
            var savePromise = await productServices.getProductybyId(req.params.id);
            res.render("edit", { edit: "product", product: savePromise })
        } catch (error) {
            console.log(error)
        }
    })();
});

app.get("/view", shopauth, (req, res) => {
    (async () => {
        try {
            params = {
                sid: req.session.sid
            }
            var productPromise = await productServices.getProduct(params);
            var subcatPromise = await subCategoryServices.getSubCategory(params);
            var catPromise = await categoryServices.getCategory(params);
            res.render('viewall', { products: productPromise, subCategories: subcatPromise, categories: catPromise })
        } catch (error) {
            console.log(error)
        }
    })();
});


app.get("/addhere/:id/:name/:var", shopauth, (req, res) => {
    (async () => {
        try {
            console.log(req.params);
            if (req.params.var == "subcategory")
                res.render('add', { add: "subcategory" + "add", id: req.params.id, name: req.params.name })
            else if (req.params.var == "product")
                res.render('add', { add: "product" + "add", id: req.params.id, name: req.params.name })
        } catch (error) {
            console.log(error)
        }
    })();
});

app.get("/delete/:id", shopauth, (req, res) => {
    (async () => {
        try {
            console.log(req.params.id)
            var productPromise = await productServices.deleteProductById(req.params.id)
            res.redirect('/product/view')
        }
        catch (error) {
            console.log(error)
        }
    })();
})

