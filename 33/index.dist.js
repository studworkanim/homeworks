'use strict';

var TODO_KEY = 'todo-list';
var todoContainerEl = $('.todo-container');
var todoListEl = $('.todo-list');
var todoInputEl = $('.todo-input');
var todoList = JSON.parse(localStorage.getItem(TODO_KEY)) || [];
todoList.forEach(addTodoToDOM);
todoContainerEl.on('click', '.add-btn', function () {
  addTodo();
}).on('click', '.delete-btn', function () {
  deleteTodoItem($(this));
}).on('click', '.todo-title', function () {
  showTodoModal($(this));
});
todoListEl.on('change', '.is-done', function () {
  toggleTodoCompletion($(this));
});
function addTodo() {
  var data = {
    id: 'id' + Date.now() + Math.random().toFixed(5),
    text: todoInputEl.val().trim(),
    completed: false
  };
  if (!data.text) {
    alert('Task cannot be empty');
    return;
  }
  todoList.push(data);
  saveTasks();
  addTodoToDOM(data);
  todoInputEl.val('');
}
function addTodoToDOM(task) {
  var todoItem = $('<li>', {
    "class": 'todo-item',
    'data-id': task.id
  });
  if (task.completed) {
    todoItem.addClass('completed');
  }
  todoItem.html("<input class=\"is-done\" type=\"checkbox\" ".concat(task.completed ? 'checked' : '', "/>\n        <span class='todo-title'>").concat(task.text, "</span><button class='delete-btn'>X</button>"));
  todoListEl.prepend(todoItem);
}
function deleteTodoItem(button) {
  var todoItem = button.closest('.todo-item');
  var currentTaskIndex = getCurrentIndexItem(todoItem);
  todoList.splice(currentTaskIndex, 1);
  saveTasks();
  todoItem.remove();
}
function toggleTodoCompletion(checkbox) {
  var todoItem = checkbox.closest('.todo-item');
  var indexCurrentItem = getCurrentIndexItem(todoItem);
  todoList[indexCurrentItem].completed = checkbox.prop('checked');
  saveTasks();
  todoItem.toggleClass('completed');
}
function saveTasks() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todoList));
}
function getCurrentIndexItem(item) {
  var currentItemId = item.data('id');
  return todoList.findIndex(function (task) {
    return task.id === currentItemId;
  });
}
function showTodoModal(target) {
  $('.modal-task-text').text(target.text());
  $('#modal-bg').modal('show');
}
