'use strict';

function getProduct(a) {
    return function(b) {
        return a * b;
    };
}

console.log(getProduct(5)(2));