const taskForm = document.getElementById("taskForm");

const taskList = document.getElementById("taskList");

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value;

    console.log(task)
})