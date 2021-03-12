let items = [];
var hiddendata = document.getElementById("hiddendata");

hiddendata.value = ""
const getChecked = () =>{
    // items = []
    table = document.getElementsByTagName("tbody");
    for(let i=0; i < table[0].rows.length; i++){
        tr = table[0].rows[i].cells
        if(tr[0].children[0].checked){
            let username = tr[1].innerHTML
            if(getUserIndex(username) == -1){
                addUser(username);
            }
            console.log("tr: ",tr)
            let item = tr[2].innerHTML
            let amount = tr[3].innerHTML
            let place = tr[4].innerHTML
            addItemToUser(username, item, amount, place)
        }
    }
    if(items.length == 0){
        return false;
    }
    hiddendata.value = JSON.stringify(items);
    return true;
}

// -----Support-----
const addUser = (username) => {
    items.push({"username": username, "items":[]})
}

const addItemToUser = (username, item, amount, location) => {
    let data = {
        "item": item,
        "amount": amount,
        "location": location
    }
    let i = getUserIndex(username);
    console.log("Items:", items);
    items[i].items.push(data);
}

const getUserIndex = (username) =>{
    for(let i = 0; i < items.length; i++){
        if(items[i].username == username){
            return i;
        }
    }
    return -1
}


// getChecked();
// console.log(hiddendata)