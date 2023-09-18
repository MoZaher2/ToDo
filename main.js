// <!-- Add Task -->
// <div class="addcontainer center">
//     <h2>Add Task</h2>
//     <div class="cont">
//         <input type="text" class="addtext">
//         <button class="addbtn">Add</button>
//     </div>
// </div>
let addbtn = document.querySelector(`[class="addbtn"]`);
let taskText = document.querySelector(`[class="addtext"]`);
let divToDo = document.querySelector(`[class="todo center"]`);
let divToDone = document.querySelector(`[class="todone center"]`);

let arrayOfTask = [];
if (localStorage.getItem("tasks")) {
  arrayOfTask = JSON.parse(localStorage.getItem("tasks"));
  //Restore Tasks From Storage
  for (let i = 0; i < arrayOfTask.length; i++) {
    addTaskToDo(arrayOfTask[i]);
  }
}
addbtn.addEventListener("click", function () {
  //Make Task
  if (taskText.value.trim() != "") {
    let taskObj = {
      id: Date.now(),
      val: taskText.value,
      completed: false,
    };
    //Add Task ToDo
    addTaskToDo(taskObj);
    //Add Task To LocalStorage
    arrayOfTask.push(taskObj);
    addTaskToLocalStorage(arrayOfTask);
    taskText.value = "";
  }
});
//Function to add task todo
function addTaskToDo(task) {
  let div = document.createElement("div");
  div.setAttribute("date-id", task.id);
  let span = document.createElement("span");
  span.innerHTML = task.val;

  let inputEdit = document.createElement("input");
  inputEdit.setAttribute("type", "text");
  inputEdit.setAttribute("class", "edittext");
  //inputEdit Event
  inputEdit.addEventListener("blur", function (e) {
    let txt = span.innerHTML;
    span.innerHTML = e.target.value;
    let newtxt = span.innerHTML;
    e.target.style.display = "none";
    span.style.display = "block";

    arrayOfTask.forEach((element) => {
      if (element.val == txt) {
        element.val = newtxt;
        localStorage.setItem("tasks", JSON.stringify(arrayOfTask));
      }
    });
  });

  let divbtn = document.createElement("div");
  divbtn.setAttribute("date-id", task.id);
  let editbtn = document.createElement("button");
  editbtn.setAttribute("class", "editbtn");
  editbtn.innerHTML = "Edit";
  //Edite Event
  editbtn.addEventListener("click", function (ele) {
    let div = ele.target.parentElement.parentElement;
    let span = div.firstChild;
    let input = div.children[1];
    input.value = span.innerHTML;
    span.style.display = "none";
    input.style.display = "block";
    input.focus();
  });

  let deletebtn = document.createElement("button");
  deletebtn.setAttribute("class", "deletebtn");
  deletebtn.innerHTML = "Delete";
  //Delete Event
  deletebtn.addEventListener("click", function (ele) {
    arrayOfTask = arrayOfTask.filter(function (element) {
      return element.id != ele.target.parentElement.getAttribute("date-id");
    });
    localStorage.setItem("tasks", JSON.stringify(arrayOfTask));
    document
      .querySelector(
        `[date-id="${ele.target.parentElement.getAttribute("date-id")}"]`
      )
      .remove();
  });

  let input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("class", "donecheckbox");
  input.setAttribute("value", "done");
  //CheckBox Event
  input.addEventListener("change", function (ele) {
    arrayOfTask.forEach((element) => {
      if (element.id == ele.target.parentElement.getAttribute("date-id")) {
        element.completed == false
          ? (element.completed = true)
          : (element.completed = false);
        localStorage.setItem("tasks", JSON.stringify(arrayOfTask));
        document.querySelector(`[date-id="${element.id}"]`).remove();
        addTaskToDo(element);
      }
    });
  });

  if (task.completed) {
    let check = document.createAttribute("checked");
    input.setAttributeNode(check);
    div.setAttribute("class", "donecontainer");
    span.setAttribute("class", "donespan");
    divbtn.setAttribute("class", "donebtn");
    divToDone.appendChild(div);
  } else {
    div.setAttribute("class", "todocontainer"); ///
    span.setAttribute("class", "todospan"); ///
    divbtn.setAttribute("class", "todobtn"); ///
    divbtn.appendChild(editbtn); ///
    divToDo.appendChild(div); ///
  }
  div.appendChild(span);
  div.appendChild(inputEdit);
  divbtn.appendChild(deletebtn);
  div.appendChild(divbtn);
  div.appendChild(input);
}
//Function to add task to LocalStorage
function addTaskToLocalStorage(arr) {
  localStorage.setItem("tasks", JSON.stringify(arr));
}
