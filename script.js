// script.js

// Run code after the page fully loads
document.addEventListener("DOMContentLoaded", function () {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Keep an in-memory tasks array in sync with localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    /**
     * addTask
     * Adds a task to the DOM and optionally saves it to localStorage.
     * @param {string|undefined} taskTextParam - text of the task; if omitted, read from input
     * @param {boolean} save - whether to save this task to localStorage (default true)
     */
    function addTask(taskTextParam, save = true) {
        // Decide task text either from parameter (when loading) or from input
        const taskText = (typeof taskTextParam === 'string') ? taskTextParam : taskInput.value.trim();

        // If the user attempted to add an empty task (only relevant when adding via input)
        if (taskText === "") {
            // If taskText came from storage (save === false) it shouldn't be empty here,
            // but if user submitted an empty input alert them.
            if (save) {
                alert("Please enter a task!");
                return;
            }
        }

        // Create <li> element for the task
        const li = document.createElement("li");

        // Use a span to hold the text so appending the button doesn't clobber it
        const span = document.createElement("span");
        span.textContent = taskText;
        li.appendChild(span);

        // Create remove button and add CSS class using classList.add
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        // When clicked, remove the li from DOM and update localStorage
        removeBtn.addEventListener("click", function () {
            // Remove from DOM
            taskList.removeChild(li);

            // Remove from stored tasks in localStorage (remove the first matching occurrence)
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const index = storedTasks.indexOf(taskText);
            if (index > -1) {
                storedTasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
                // Keep in-memory tasks in sync
                tasks = storedTasks;
            }
        });

        // Append button to li, and li to the visible list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // If we're supposed to save this task, update localStorage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
            tasks = storedTasks; // sync memory copy
        }

        // Clear the input field for the next task (only relevant when user typed it)
        taskInput.value = "";
    }

    /**
     * loadTasks
     * Loads tasks from localStorage and creates DOM entries for each.
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // For each saved task, call addTask with save = false to avoid re-saving
        storedTasks.forEach(taskText => addTask(taskText, false));
        // Ensure in-memory tasks variable is up-to-date
        tasks = storedTasks;
    }

    // Add task when button is clicked
    addButton.addEventListener("click", function () {
        addTask(); // default save = true
    });

    // Add task when "Enter" is pressed in the input field
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Load existing tasks on page load
    loadTasks();
});
