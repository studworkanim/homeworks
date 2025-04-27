'use strict';

const todoListEl = document.querySelector('.todo-list');
const todoInputEl = document.querySelector('.todo-input');
const addBtnEl = document.querySelector('.add-btn');

const TODO_KEY = 'todo-list';

const todoList = JSON.parse(localStorage.getItem(TODO_KEY) || '[]');
todoList.forEach(addTodoItemToPage);

addBtnEl.addEventListener('click', () => {
    const title = todoInputEl.value.trim();
    if (!title) {
        alert('Cannot add an empty task')
        return;
    }

    const id = 'id' + Date.now();
    todoList.push({ id, title, isCompleted: false });

    addTodoItemToPage(todoList.at(-1));
    todoInputEl.value = '';
    saveTasks();
});

function addTodoItemToPage({ id, title, isCompleted }) {
    const todoItemEl = document.createElement('li');
    todoItemEl.id = id;
    todoItemEl.innerHTML = `<input class="is-done" type="checkbox"/><span class='todo-title'>${title}</span><button class='delete-btn'>X</button>`;
    todoItemEl.children[0].checked = isCompleted;
    if (isCompleted) {
        todoItemEl.classList.add('completed');
    }

    todoListEl.appendChild(todoItemEl);
}

todoListEl.addEventListener('click', ({ target }) => {
    if (!target.classList.contains('delete-btn')) {
        return;
    }

    const taskIndex = todoList.findIndex(t => t.id === target.parentElement.id);
    todoList.splice(taskIndex, 1);
    target.parentElement.remove();
    saveTasks();
});

todoListEl.addEventListener('change', ({ target }) => {
    if (!target.classList.contains('is-done')) {
        return;
    }

    const todoItemEl = target.parentElement;
    const todoItem = todoList.find(t => t.id === target.parentElement.id);
    todoItem.isCompleted =  target.checked;
    if (target.checked) {
        todoItemEl.classList.add('completed');
    }
    else {
        todoItemEl.classList.remove('completed');
    }
    saveTasks();
});

function saveTasks() {
    localStorage.setItem(TODO_KEY, JSON.stringify(todoList));
}