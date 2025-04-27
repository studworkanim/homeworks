'use strict';

const USD_IN_UAH = 26;
const START_AMOUNT = 10;
const END_AMOUNT = 100;
const STEP = 10;

for(let num = START_AMOUNT; num <= END_AMOUNT; num += STEP) {
    console.log(`${num} USD = ${USD_IN_UAH * num} UAH`);
}