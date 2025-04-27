'use strict';

const btnList = document.querySelector(".btn-list");

btnList.addEventListener('click', event => {
    if (event.target.classList.contains('btn')) {
        alert(`Button clicked: ${event.target.textContent}`);
    }
});