'use strict';

const userStrInput = prompt("Enter a string");
const userSymbolsInput = prompt("Enter symbols to remove");

if (!userStrInput?.trim() || !userSymbolsInput?.trim()) {
    alert("String or symbols are not entered");
}
else {
    const result = func(userStrInput.trim(), userSymbolsInput.trim().split(''));
    alert('Your updated string: ' + result);
}

function func(str, symbols) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (!symbols.includes(str[i])) {
            result += str[i];
        }
    }
    
    return result;
}