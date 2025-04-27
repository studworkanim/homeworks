'use strict';

import './styles.css';

const todoListEl = document.querySelector('.todo-list');
const todoInputEl = document.querySelector('.todo-input');
const addBtnEl = document.querySelector('.add-btn');

const todoList = [];

async function fetchTasks() {
    try {
        const response = await fetch('/tasks');
        if (!response.ok) throw new Error('Error');

        return await response.json(); 
    } catch (error) {
        console.error('Error', error);
        return [];
    }
}

fetchTasks().then(list => {
    todoList.push(...list);
    todoList.forEach(addTodoItemToPage);
});

addBtnEl.addEventListener('click', async () => {
    const text = todoInputEl.value.trim();
    if (!text) {
        alert('Cannot add an empty task')
        return;
    }

    const dbTask = await addTaskToDB(text, false);
    if (!dbTask) {
        return;
    }

    todoList.push(dbTask);

    addTodoItemToPage(dbTask);
    todoInputEl.value = '';
});

function addTodoItemToPage({ _id, text, completed }) {
    const todoItemEl = document.createElement('li');
    todoItemEl.id = _id;
    todoItemEl.innerHTML = `<input class="is-done" type="checkbox"/>
        <span class='todo-title'>${text}</span><button class='delete-btn'>X</button>`;
    todoItemEl.children[0].checked = completed;
    if (completed) {
        todoItemEl.classList.add('completed');
    }

    todoListEl.appendChild(todoItemEl);
}

todoListEl.addEventListener('click', async ({ target }) => {
    if (!target.classList.contains('delete-btn')) {
        return;
    }

    const isOk = await deleteTaskFromDB(target.parentElement.id);
    if (!isOk) {
        return;
    }

    const taskIndex = todoList.findIndex(t => t._id === target.parentElement.id);
    todoList.splice(taskIndex, 1);
    target.parentElement.remove();
});

todoListEl.addEventListener('change', async ({ target }) => {
    if (!target.classList.contains('is-done')) {
        return;
    }

    const todoItemEl = target.parentElement;

    const isOk = await updateTaskInDB(todoItemEl.id, { completed: target.checked });
    if (!isOk) {
        return;
    }

    const todoItem = todoList.find(t => t._id === todoItemEl.id);
    todoItem.completed =  target.checked;
    if (target.checked) {
        todoItemEl.classList.add('completed');
    }
    else {
        todoItemEl.classList.remove('completed');
    }
});

async function addTaskToDB(text, completed = false) {
    try {
        const response = await fetch('/tasks', { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, completed }), 
        });

        return await response.json(); 
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function deleteTaskFromDB(taskId) {
    try {
        await fetch(`/tasks/${taskId}`, { method: 'DELETE' });
        return true;
    } catch (error) {
        console.error(error);
        return false; 
    }
}

async function updateTaskInDB(taskId, updates) {
    try {
        await fetch(`/tasks/${taskId}`, { 
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(updates), 
        });
        return true;
    } catch (error) {
        console.error(error); 
        return false;
    }
}