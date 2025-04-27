'use strict';

const array = [1, 3, 4, 4, 6, 2, 5, 4, 7];

function removeElement(userArray, itemRemove) {
    for (let i = userArray.length - 1; i >= 0; i--) {
        if (userArray[i] === itemRemove) {
            userArray.splice(i, 1);
        }
    }
}

removeElement(array, 4);
console.log('Updated list: ', array);