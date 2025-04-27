'use strict';

const START_NUM = 20;
const END_NUM = 30;
const STEP = 0.5;

let result = '';
for (let i = START_NUM; i <= END_NUM; i+=STEP) {
    result += i + ' ';
}

console.log(result.slice(0, -1));