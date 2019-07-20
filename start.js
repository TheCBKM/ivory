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
