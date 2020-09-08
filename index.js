const express = require("express");
const bparser = require("body-parser");
const sesh = require("express-session");
require("dotenv").config();
const app = express();


app.set('view engine', 'pug');
app.set('views', __dirname + '/views');





app.listen(process.env.PORT, process.env.HOSTNAME, () =>{

});