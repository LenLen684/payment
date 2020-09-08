const util = require('./utils');

const getAllData = (req, res) => {
    res.json(util.getAllData());
}


module.exports = {
    getAllData,
}