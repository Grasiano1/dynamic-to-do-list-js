// Run code after the page fully loads
document.addEventListener("DOMContentLoaded", function () {
  // Select key elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Function to add a new task
  function addTask() {
    const taskText = taskInput.value.trim(); // remove extra spaces

    // Check if input is empty
    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    // Create a new <li>
    const li = document.createElement("li");
    li.textContent = taskText;

    // Create a remove button for this task
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";

    // When clicked, remove the task
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    // Add button to li, then li to list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear input field
    taskInput.value = "";
  }

  // Add task when button is clicked
  addButton.addEventListener("click", addTask);

  // Add task when "Enter" is pressed
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
