const taskForm = document.getElementById("taskForm");

const taskList = document.getElementById("taskList");

const themeToogleButton = document.getElementById("themeToogle");

const currentTheme = localStorage.getItem("theme");

loadTasks();

if(currentTheme === "dark") {
    document.body.classList.add("dark-theme")
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value;
    if(task) {
        taskList.append(createTaskElement(task));
        saveTasksInLocalStorage(task)
        taskInput.value = null;
    }
})


themeToogleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    const theme = document.body.classList.contains("dark-theme")
        ? "dark"
        : "light";
    localStorage.setItem("theme", theme);
});

taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")){
        deleteTask(event.target.parentElement);
    } else if (event.target.classList.contains("edit-btn")){
        editTask(event.target.parentElement);
    }
})

function createTaskElement(task) {
    const li = document.createElement("li");
    li.textContent = task;
    li.append(createButton("delete-btn"), createButton("edit-btn"));
    return li;
}

function createButton(className) {
    const button = document.createElement("span");
    button.className = className;
    return button;
}


function deleteTask(task) {
    if (confirm("¡Estas seguro que deseas eliminar la tarea?")){
        task.remove();
    }
    updateLocalStorage();
}

function editTask(task) {
    const newTask = prompt("Edita la tarea:", task.firstChild.textContent);
    if (newTask != null){
        task.firstChild.textContent = newTask;
    }
    updateLocalStorage();
}

function saveTasksInLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks" || "[]"));
    if(tasks) {
        tasks.forEach(task => {
            taskList.appendChild(createTaskElement(task));
        }); 
    }
}

function updateLocalStorage() {
    const tasks = Array.from(taskList.querySelectorAll("li")).map(
        (li) => li.firstChild.textContent
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
}