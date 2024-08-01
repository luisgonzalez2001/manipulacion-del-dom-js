const taskForm = document.getElementById("taskForm");

const taskList = document.getElementById("taskList");

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value;

    console.log(task)

    if(task) {
        taskList.append(createTaskElement(task));
        taskInput.value = null;
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

taskList.addEventListener("click", (event) => {
    console.log(event.target);

    if (event.target.classList.contains("delete-btn")){
        deleteTask(event.target.parentElement);
    } else if (event.target.classList.contains("edit-btn")){
        editTask(event.target.parentElement);
    }
})

function deleteTask(task) {
    if (confirm("¡Estas seguro que deseas eliminar la tarea?")){
        task.remove();
    }
}

function editTask(task) {
    const newTask = prompt("Edita la tarea:", task.firstChild.textContent);
    if (newTask != null){
        task.firstChild.textContent = newTask;
    }
}