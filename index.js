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


app.listen(port, hostname, () =>{
    console.log(`payment running at http://${hostname}:${port}`);
});