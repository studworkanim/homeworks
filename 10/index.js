'use strict';

const userNumInput = prompt("Enter a whole number");

if (!userNumInput?.trim()) {
    alert("Error: Nothing is entered");
}
else if (!Number.isInteger(+userNumInput)) {
   alert(`Error: Not a valid whole number`);
}
else {
    const nums = [];

    for (let i = 1; i <= 100; i++) {
        if (i ** 2 > userNumInput) { 
            break;
        }

        nums.push(i);
    }

    if (nums.length) {
      alert(`Your numbers: ${nums.join(', ')}`);
    }
    else {
        alert('No numbers are found');
    }
}