const table = document.getElementsByTagName
let items = [];



// -----Support-----
const addUser = (username) => {
    items.push({username: []})
}

const addItemToUser = (username, item, amount, location) => {
    item = {
        "item": "Fizzy Drinks",
        "amount": 8,
        "location": "Walmart"
    }
    items.username.push(item)
}