const fs = require('fs');
const bcrypt = require('bcryptjs');
const DB = './data.json';

// return all data
const getAllData = () => {
    let data = JSON.parse(fs.readFileSync(DB, {encoding:'utf-8'}));
    return data;
}

// encrypt the password
const encryptPassword = password => {
    let salt = bcrypt.genSaltSync();
    let hash = bcrypt.hashSync(password, salt);
    return hash;
};

// verify password matches
const verifyPassword = (username, password) => {
    let data = getAllData();
    for(datum of data) {
        if (datum.username === username) {
            return bcrypt.compareSync(password, datum.password);
        }
    }
    return false;
};

// check if username is taken or not
const checkUsername = username => {
    let data = getAllData();
    for(datum of data) {
        if (username === datum.username) {
            // if username already exists, return undefined
            return true;
        }
    }
    return false;
}


// gets a specific users data
const getUserData = username => {
    let data = getAllData();
    for(datum of data) {
        if(datum.username == username) {
            return datum;
        }
    }
    return undefined; 
}

// remove user from DB
const removeUserData = username => {
    let data = getAllData();
    for(let i = 0; i < data.length; i++) {
        if(data[i].username == username) {
            delete data[i];
            break;
        }
    }
    writeAllData(data.filter(data=>data != null));
}

// add user to the data file
const addUser = user => {
    let data = getAllData();
    data.push(user);
    writeAllData(data);
};

// edit user with new all new data 
const editUserData = newUser => {
    let oldUser = getUserData(newUser.username);
    removeUserData(oldUser.username);
    addUser(newUser);

}

// override all data with new data
const writeAllData = data => {
    fs.writeFileSync(DB,JSON.stringify(data, null, 4),{encoding:'utf-8'});
}

const createUser = (username, password, household) =>{
    user = {
        "username": username,
        "password": encryptPassword(password),
        "groceries": [],
        "payments": [],
        "public": true,
        "household": [
            username,
            household
        ]
    }
    addUser(user);
}

//export helper functions
module.exports = {
    getAllData,
    encryptPassword,
    verifyPassword,
    checkUsername,
    getUserData,
    removeUserData,
    addUser,
    editUserData,
    writeAllData,
    createUser
}