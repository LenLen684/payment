const express = require("express");
const bparser = require("body-parser");
const sesh = require("express-session");
const routes = require('./routes/routes');
require("dotenv").config();

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

// use this for post requests 
const urlEncodedParser = bparser.urlencoded({
    extended: true
});

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// express-sessions for
app.use(sesh({
    secret: process.env.PASSWORD,
    saveUninitialized: true,
    resave: true
}));

// api headers to allow access :D
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api', routes.api);

app.get('/', routes.index);
app.get('/pay', routes.payment);
app.get('/pay/add', routes.payForm);
app.get('/shop', routes.groceries);
app.get('/shop/add', routes.groceryForm);
app.get('/login', routes.loginForm);
app.get('/logout', routes.logout)

app.post('/',urlEncodedParser, routes.loggedin)
app.post('/pay',urlEncodedParser, routes.addPayment)
app.post('/shop',urlEncodedParser,routes.addGroceries)
app.post('/shop/delete', urlEncodedParser, routes.deleteGrocery)

app.listen(port, () =>{
    console.log(`payment running at http://${port}`);
});
"test"