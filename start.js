var express = require('express');
var app = express();
var routes=require('./routes')
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render('index', { user: "Great User", title: "homepage" });
});

const mongoose = require('mongoose');
function run() {
    mongoose.connect('mongodb+srv://cbkm:rj2020m@shopping-c1evz.mongodb.net/ivory?retryWrites=true&w=majority', { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("connected to mongo")
    });
    app.get('/get', (req, res) => {
        res.json('Hello')
    })
    app.use('/', routes);

    app.listen(process.env.PORT || 8080);
}


module.exports = run;
if (require.main === module) {
    //   handleAsyncExceptions();
    run();
}


/*
30 JUly 2019

Features Added till now:-
1. Products
2. Sale
3. Inventory
4. Transactions

Brief Details of above

1. Poducts
    In this Section We can Add/Update new
        -Category
        -Sub category 
        -Product & Price

2. Sale
    In this Section We genrate bills
    but with tracking of products available
    in Inventory 

3. Inventory 
    In this section we can 
    track The products availble 
    an also refill/Add in the inventory

4. Transactions 
    Here We can See all the transaction 
    with date and price 

    
*/