'use strict';

const userNumInput = prompt("Enter 3-digit number");

if (!userNumInput?.trim()) {
  alert(`Error: Nothing is entered`);
}
else if (!Number.isInteger(+userNumInput)) {
  alert(`Error: Not a valid whole number`);
}
else {
  const numStr = String(Math.abs(+userNumInput));
  if (numStr.length !== 3) {
    alert(`Error: Not a 3-digit number`);
  }
  else {
    const digit1 = numStr[0];
    const digit2 = numStr[1];
    const digit3 = numStr[2];

    const allEqual = digit1 === digit2 && digit2 === digit3;
    const anyEqual = digit1 === digit2 || digit2 === digit3 || digit1 === digit3;
        
    if (allEqual) {
        alert(`${+userNumInput}: All 3 digits are the same`);
    } else if (anyEqual) {
        alert(`${+userNumInput}: There are 2 same digits`);
    } else {
        alert(`${+userNumInput}: All digits are different`);
    }
  }
}