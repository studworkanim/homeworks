'use strict';

const userNameInput = prompt("Hi, what's your name?");

if (!userNameInput?.trim()) {
  alert(`Hello, [noname]! How are you?`)
}
else {
    alert(`Hello, ${userNameInput}! How are you?`)
}