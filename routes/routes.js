const config = require('../config')
const api = require('./api');
const data = require('../data.json')


const index = (req, res) => { //login page
    res.render('index', {
        title: 'Pay Check',
        config
    });
}
const payment = (req, res) => { //login page
    res.render('payment', {
        title: 'Payment Record',
        config,
        data
    });
}
const groceries = (req, res) => { //login page
    res.render('groceries', {
        title: 'Grocery List',
        config,
        data
    });
}

module.exports = {
    api: api.getAllData,
    index,
    groceries,
    payment
}