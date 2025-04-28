var inputText = document.querySelector(".todo-input");
var addingButton = document.querySelector(".add-button");

document.addEventListener("keydown", 
    (e) => {
        if((e.key === "Enter") && (inputText.value !== "")){
            addTaskToList(inputText.value.slice(0, 50));
            inputText.value="";
            saveTasksToLocalStorage();
        }
    });

addingButton.addEventListener("click", 
    () => {
        if(inputText.value !== ""){
            addTaskToList(inputText.value.slice(0, 59));
            inputText.value="";
            saveTasksToLocalStorage();
        }
    });

// Aufgaben beim Laden wiederherstellen
window.addEventListener("load", loadTasksFromLocalStorage);

function addTaskToList(inputString, isDone = false){
    var task = document.createElement("li");
    task.classList.add("task-list-item");
    document.querySelector(".task-list").appendChild(task);

    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("checkbox");
    task.appendChild(checkbox);
    checkbox.addEventListener("click", 
        () => {        
            task.classList.toggle("done");
            taskText.classList.toggle("line-through");
            saveTasksToLocalStorage();
        });

    var taskText = document.createElement("p");
    taskText.classList.add("task-text");
    taskText.innerText = inputString;
    task.appendChild(taskText);

    var deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = "&times;"; // Kreuz-Symbol
    task.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
        task.classList.add("fade-out");
        setTimeout(() => {
            task.remove();
            saveTasksToLocalStorage();
        }, 300);
    });

    if(isDone) {
        task.classList.add("done");
        checkbox.checked = true;
    }
}

function saveTasksToLocalStorage() {
    const tasks = [...document.querySelectorAll(".task-list-item")].map(task => {
        const text = task.querySelector(".task-text").innerText;
        const done = task.classList.contains("done");
        return { text, done };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(taskObj => {
        addTaskToList(taskObj.text, taskObj.done);
    });
}
