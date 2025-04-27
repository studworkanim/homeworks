'use strict';

const userNumInput = prompt("Enter a whole number");

if (!userNumInput?.trim()) {
    alert("Error: Nothing is entered");
}
else if (!Number.isInteger(+userNumInput)) {
   alert(`Error: Not a valid whole number`);
}
else {
    const num = +userNumInput;
    if (num <= 1) {
        alert(num + ` is not prime`);
    }
    else {        
        let isPrime = true;
    
        for (let divider = 2; divider <= Math.sqrt(num); divider++) {
            if (num % divider === 0) {
                isPrime = false; 
                break;
            }
        }
    
        alert(num + ` is${isPrime ? '' : ' not'} prime`);
    }
}