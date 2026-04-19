let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);

    if (parsedTodoList === null) return [];
    else return parsedTodoList;
}

let todoList = getTodoListFromLocalStorage();

// let todoList = [{
//         text: "Learn HTML",
//         uniqueNo: 1
//     },
//     {
//         text: "Learn CSS",
//         uniqueNo: 2
//     },
//     {
//         text: "Learn JavaScript",
//         uniqueNo: 3
//     }
// ];

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) return true;
        else return false;
    });
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteTodoIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteTodoIndex, 1);
}

function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;
    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.setAttribute("id", labelId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container", "d-flex", "flex-column", "justify-content-center");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
    </svg>`;
    deleteIcon.classList.add("pr-2");
    deleteIconContainer.appendChild(deleteIcon);

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

let todosCount = todoList.length;
addTodoButton.onclick = function() {
    let UserInputElement = document.getElementById("todoUserInput");
    let userInputValue = UserInputElement.value;
    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }
    todosCount = todosCount + 1;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    UserInputElement.value = "";
};

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};