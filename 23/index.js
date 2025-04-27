'use strict';

const todoListEl = document.querySelector('.todo-list');
const todoInputEl = document.querySelector('.todo-input');
const addBtnEl = document.querySelector('.add-btn');

const todoList = [];

addBtnEl.addEventListener('click', () => {
    const title = todoInputEl.value.trim();
    if (!title) {
        alert('Cannot add an empty task')
        return;
    }

    const id = 'id' + Date.now();
    todoList.push({ id, title });

    const todoItemEl = document.createElement('li');
    todoItemEl.id = id
    todoItemEl.innerHTML = `<span class='todo-title'>${title}</span><button class='delete-btn'>X</button>`;

    todoListEl.appendChild(todoItemEl);
    todoInputEl.value = '';
})

todoListEl.addEventListener('click', ({ target }) => {
    if (target.classList.contains('delete-btn')) {
        const taskIndex = todoList.findIndex(t => t.id === target.parentElement.id);
        todoList.splice(taskIndex, 1);
        target.parentElement.remove();
    }
});