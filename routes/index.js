const app = module.exports = require('express')();

app.use('/product', require('./productRoute'));
app.use('/category', require('./categoryRoute'));
app.use('/subcategory', require('./subCategoryRoute'));
app.use('/bill', require('./billRoute'));
app.use('/inventory', require('./inventoryRoute'));
app.use('/order', require('./orderRoute'));
app.use('/coustomer', require('./coustomerRoute'));
app.use('/shop', require('./shopRoute'));


