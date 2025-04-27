'use strict';

const textEl = document.querySelector(".text");
const switchColorEl = document.querySelector('.change-btn');

switchColorEl.addEventListener('click', () => {
    textEl.classList.toggle('green');
});