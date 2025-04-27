'use strict';

const productTableEl = document.createElement('table');
const TABLE_SIZE = 10;

for (let i = 0; i <= TABLE_SIZE; i++) {
    const rowEl = document.createElement('tr');

    for (let j = 0; j <= TABLE_SIZE; j++) {
        const cellTag = (i === 0 || j === 0) ? 'th' : 'td';
        const cellEl = document.createElement(cellTag);

        if (i === 0 && j === 0) {
            cellEl.textContent = '';
        } else if (i === 0) {
            cellEl.textContent = j;
        } else if (j === 0) {
            cellEl.textContent = i;
        } else {
            cellEl.textContent = i * j;
        }

        rowEl.appendChild(cellEl);
    }

    productTableEl.appendChild(rowEl);
}

document.body.append(productTableEl);