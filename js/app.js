let dateTime = document.querySelector("#dateTime");
let addItemBtn = document.querySelector(".btn");

function display_c(){
    var refresh=1000; 
    mytime=setTimeout('display_ct()',refresh);
}
function display_ct() {
    var x = new Date();
    var x1=x.getMonth() + 1+ "/" + x.getDate() + "/" + x.getFullYear(); 
    x1 = x1 + " - " +  x.getHours( )+ ":" +  x.getMinutes() + ":" +  x.getSeconds();
    document.getElementById('ct').innerHTML = x1;
    display_c();
}

addItemBtn.addEventListener("click", addItem);
document.querySelector("#limitReached").style.display = 'none';

function addItem(){
    let newItemInput = document.querySelector("#newItem").value;

    let todoItemsContainer = document.querySelector("#todoItemsContainer");

    let itemContainer = document.createElement("div");
    itemContainer.classList = "item-container";

    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList = "check-box";

    let itemBox = document.createElement("input");
    itemBox.type = "text";
    itemBox.classList = "item-box";
    itemBox.setAttribute("disabled", ""); 
    itemBox.value = newItemInput;
    itemBox.defaultValue = newItemInput;

    let actionContainer = document.createElement("div");
    actionContainer.classList = "action-container";

    let editBtn = document.createElement("button");
    editBtn.innerHTML = "<span class='material-symbols-outlined'>edit_note</span>";
    editBtn.classList = "edit-btn";
    editBtn.addEventListener("click", editItem);

    let delBtn = document.createElement("button");
    delBtn.innerHTML = "<span class='material-symbols-outlined'>delete</span>";
    delBtn.classList = "del-btn";
    delBtn.addEventListener("click", delItem);

    todoItemsContainer.appendChild(itemContainer);
    itemContainer.appendChild(checkBox);
    itemContainer.appendChild(itemBox);
    itemContainer.appendChild(actionContainer);
    actionContainer.appendChild(editBtn);
    actionContainer.appendChild(delBtn);

    if (todoItemsContainer.childElementCount > 1) {
        document.querySelector("#emptySoul").style.display = 'none';
    } else {}

    if (todoItemsContainer.childElementCount === 6 ) {
        addItemBtn.setAttribute("disabled", "");
        addItemBtn.setAttribute("style", "color: gray");     
        document.querySelector("#limitReached").style.display = 'block';
    } else {}

    function delItem() {
        let delText = "Are you sure, though?";
        
        if (confirm(delText) === true) {
            delBtn.parentElement.parentElement.remove();
        } else {
            delText= "Noice!";
            alert(delText);
        }
        if (todoItemsContainer.childElementCount === 1) {
            document.querySelector("#emptySoul").style.display = 'block';
        } else if (todoItemsContainer.childElementCount < 6) {
            addItemBtn.removeAttribute("disabled", "");
            addItemBtn.removeAttribute("style", "color: gray");
            document.querySelector("#limitReached").style.display = 'none';
        }
    }

    function editItem() {
        itemBox.setAttribute("style", "color: white");
        itemBox.removeAttribute("disabled", "");

        editBtn.setAttribute("disabled", "");
        editBtn.setAttribute("style", "color: gray");

        checkBox.style.display = "none";

        let saveBtn = document.createElement("button");
        saveBtn.innerHTML = "<span class='material-symbols-outlined'>save</span>";
        saveBtn.classList = "save-btn";
        saveBtn.addEventListener("click", saveItem);

        actionContainer.appendChild(saveBtn);

        function saveItem() {
            let saveText = "Are you sure you want to save changes?";

            if (confirm(saveText) ===  true) {
                editBtn.removeAttribute("disabled", "");
                editBtn.removeAttribute("style", "");

                let editedItemBox = itemBox.value;
                itemBox.defaultValue = editedItemBox;

                itemBox.setAttribute("disabled", "");
                itemBox.removeAttribute("style", "");

                saveBtn.style.display = "none";

                checkBox.style.display = "block";
                
                saveText = "Saved successfully!";
            } else {
                saveText = "Cancelled.";
                
                editBtn.removeAttribute("disabled", "");
                editBtn.removeAttribute("style", "");

                itemBox.value = itemBox.defaultValue;
                itemBox.setAttribute("disabled", "");
                itemBox.setAttribute("style", "color: #0EA5E9");
                // itemBox.style.color = "#0EA5E9";

                saveBtn.style.display = "none";

                checkBox.style.display = "block";
                console.log(itemBox.value)
            }
            alert(saveText);
        }
    }
}