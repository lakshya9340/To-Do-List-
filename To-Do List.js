const taskInput1 = $("#user-input");
const taskList1 = $("#task-list");
const taskInput2 = $("#user-input2");
const taskList2 = $("#task-list2");
const currentDate = new Date();
const nextDate = new Date(currentDate);
nextDate.setDate(currentDate.getDate() + 1);

function updateList(taskInput, taskList) {
  const task = taskInput.val().trim();
  console.log(task);

  if (task !== "") {
    const li = document.createElement("li");
    const del_btn = document.createElement("button");
    const edit_btn = document.createElement("button");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    del_btn.innerHTML = "-";
    edit_btn.innerHTML = "+";

    li.classList.add("task-item");
    del_btn.classList.add("delete-btn");
    edit_btn.classList.add("edit-btn");
    checkbox.classList.add("checkbox");

    li.appendChild(checkbox);
    li.append(task);
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

$(document).on("click", ".edit-btn", function () {
  const li = $(this).parent();
  const currentText = li.contents().get(1).nodeValue.trim();

  console.log(currentText);

  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.classList.add("edit-input");
  input.focus();

  const saveBtn = document.createElement("button");
  saveBtn.innerHTML = "Save";
  saveBtn.classList.add("save-btn");

  li.contents().get(1).nodeValue = "";
    li.find(".checkbox").after(input);
  input.after(saveBtn);

  $(this).remove();
});

$(document).on("click", ".save-btn", function () {
  const li = $(this).parent();
  const input = li.find(".edit-input");
  const newText = input.val().trim();
  const edit_btn = document.createElement("button");
  edit_btn.innerHTML = "+";
  edit_btn.classList.add("edit-btn");

  if (newText !== "") {
    li
      .contents()
      .filter(function () {
        return this.nodeType === 3; // Node.TEXT_NODE
      })
      .get(0).nodeValue = newText;

    console.log(newText);
  } else {
    alert("Task cannot be empty");
  }

  li.find(".delete-btn").before(edit_btn);
  input.remove();
  $(this).remove();
});
