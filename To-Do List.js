const taskInput1 = $("#user-input");
const taskList1 = $("#task-list");
const taskInput2 = $("#user-input2");
const taskList2 = $("#task-list2");
const currentDate = new Date();
const nextDate = new Date(currentDate);
nextDate.setDate(currentDate.getDate() + 1);
let checkboxCounter = 0;

function updateList(taskInput, taskList) {
  const task = taskInput.val().trim();
  console.log(task);

  if (task !== "") {
    const li = document.createElement("li");
    const del_btn = document.createElement("button");
    const edit_btn = document.createElement("button");
    const checkbox = document.createElement("input");
    const div = document.createElement("div");
    const label = document.createElement("label");
    const taskText = document.createElement("span");

    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");

    const uniqueId = `checkbox-${checkboxCounter++}`;
    checkbox.setAttribute("id", uniqueId);
    label.setAttribute("for", uniqueId);


    del_btn.innerHTML = "🗑️";
    edit_btn.innerHTML = "✏️";

    li.classList.add("task-item");
    del_btn.classList.add("delete-btn");
    edit_btn.classList.add("edit-btn");

    
    div.classList.add("round");
    label.classList.add("checkbox-label");

    taskText.classList.add("task-text"); // Add a class to the <span>
    taskText.textContent = task;

    div.appendChild(checkbox);
    div.appendChild(label);

    li.appendChild(div);
    li.appendChild(taskText);
    li.appendChild(edit_btn);
    li.appendChild(del_btn);

    taskList.append($(li));
    taskInput.val("");
  }
}

$("#add-btn").click(function () {
  updateList(taskInput1, taskList1);
});

$("#add-btn2").click(function () {
  updateList(taskInput2, taskList2);
});

taskInput1.on("keydown", function (event) {
  if (event.key === "Enter") {
    updateList(taskInput1, taskList1);
  }
});

taskInput2.on("keydown", function (event) {
  if (event.key === "Enter") {
    updateList(taskInput2, taskList2);
  }
});

$("#sub-head").html("Today -" + currentDate.toDateString());

$("#sub-head2").html("Tommorow -" + nextDate.toDateString());

$(document).on("click", ".delete-btn", function () {
  const userConfirmed = confirm("Are you sure you to delete this task?");
  if (userConfirmed) {
    $(this).parent().remove();
  }
});

$(document).on("click", ".checkbox", function () {
  const li = $(this).closest("li"); 

  if ($(this).is(":checked")) {
     li.addClass("task-done");
    li.find(".edit-btn").remove();
  } else {
    li.removeClass("task-done");
    const edit_btn = document.createElement("button");
    edit_btn.innerHTML = "✏️";
    edit_btn.classList.add("edit-btn");
    li.find(".delete-btn").before(edit_btn);
  }
});

$(document).on("click", ".edit-btn", function () {
  const li = $(this).parent();
  const currentText = li.find(".task-text").text().trim();
  li.addClass("double-div");
  li.find(".checkbox").prop("disabled", true);
  li.find(".round").addClass("less-opacity");
  console.log(currentText);

  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.classList.add("edit-input");
  input.focus();

  const saveBtn = document.createElement("button");
  saveBtn.innerHTML = "Save 💾";
  saveBtn.classList.add("save-btn");

  li.find(".task-text").remove(); // Remove the <span> containing the task text
  li.find(".round").after(input); // Add the input field after the checkbox container
  $(input).after(saveBtn);

  $(this).remove();
});

$(document).on("click", ".save-btn", function () {
  const li = $(this).parent();
  const input = li.find(".edit-input");
  const newText = input.val().trim();
  const edit_btn = document.createElement("button");
  li.find(".checkbox").prop("disabled", false);
  edit_btn.innerHTML = "✏️";
  edit_btn.classList.add("edit-btn");

  if (newText !== "") {
    const taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = newText; // Set the new task text

    li.find(".edit-input").remove(); // Remove the input field
    li.find(".round").after(taskText); // Add the <span> back to the <li>
  } else {
    alert("Task cannot be empty");
  }

  li.find(".delete-btn").before(edit_btn);
  li.find(".round").removeClass("less-opacity");
  input.remove();
  li.removeClass("double-div");
  $(this).remove();
});
