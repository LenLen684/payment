const config = require('../config')
const api = require('./api');
const util = require('./utils');
//let data = util.getAllData();

// -----Gets-----
const index = (req, res) => {
    res.render('index', {
        title: 'Pay Check',
        config
    });
}
const payment = (req, res) => {
    res.render('payment', {
        title: 'Payment Record',
        config,
        data: util.getAllData(),
    });
}

const payForm = (req, res) =>{
    res.render('form', {
        title: "Add Payment Record",
        config,
        header:"Add Record",
        data: config.payment,
        action: "/pay",
    })
}

const groceries = (req, res) => {
    res.render('groceries', {
        title: 'Grocery List',
        config,
        data: util.getAllData(),
    });
}

const groceryForm = (req, res) =>{
    res.render('form', {
        title: "Add Grocery Item",
        config,
        header: "Add Item",
        data: config.groceries,
        action: "/shop",
    })
}
const loginForm = (req,res) =>{
    res.render('form',{
        title: 'Login or Sign Up',
        config,
        header:"Log in",
        data: config.login,
        header2:"Sign up",
        data2: config.signup,
        action: "/"
    })
}

const logout = (req,res) => { //logging out
    req.session.destroy
    res.redirect('/');
    return
}

// -----Posts-----

const loggedin = (req, res) =>{
    username = req.body.username
    password = req.body.password
    button = req.body.submit
    if(username === "" || password === ""){
        console.log("username or password was empty")
        res.redirect('/login')
        return
    }
    if(button == "Sign up"){
        household = req.body.household
        console.log("Sign up was pressed")
        nameTaken = util.checkUsername(username);
        if(nameTaken){
            res.redirect('/login')
            return
        }
        util.createUser(username, password, household);
    }
    //Now do the rest of the login stuff
    
    //Password check
    passcheck = util.verifyPassword(username, password)
    if(!passcheck){
        console.log("Password incorrect")
        res.redirect('/login');
        return
    }
    //session creation
    req.session.user = {
        "username": username,
        // "household": household
    }
    res.redirect('/');
    return
}

const addPayment = (req, res) =>{
    username = req.body.username
    amount = req.body.amount
    date = req.body.date.split("-")

    if(username == "" || amount == "" || date == ""){
        res.redirect('/pay/add')
        return
    }
    user = util.getUserData(username);
    user.payments.push({"amount": amount,"date":{"day":date[2],"month":date[1],"year":date[0]}});
    util.editUserData(user);
    res.redirect('/pay');
}

const addGroceries = (req, res) =>{
    username = req.body.username;
    item = req.body.item;
    amount = req.body.amount;
    location = req.body.location;
    if(item === ""){
        res.redirect('/shop/add');
        return
    }
    if (username === ""){
        username = "test";
    }
    if(amount === ""){
        amount = 1;
    }
    if(location ===""){
        location = "Walmart";
    }
    user = util.getUserData(username);
    user.groceries.push({"item":item, "amount":amount, "location":location});
    util.editUserData(user);
    res.redirect('/shop');
}

module.exports = {
    api: api.getAllData,
    index,
    loginForm,
    groceries,
    payment,
    payForm,
    groceryForm,
    addPayment,
    addGroceries,
    loggedin,
    logout,
}