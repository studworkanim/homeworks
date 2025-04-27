'use strict';

function getAverageNum(list) {
    let sum = 0;
    let numCount = 0;

    for (let i = 0; i < list.length; i++) {
        if (typeof list[i] === "number" && !isNaN(list[i])) {
            sum += list[i];
            numCount++;
        }
    }

    if (numCount === 0) {
        return null;
    }

    return sum / numCount;
}

const averageNum = getAverageNum([1, NaN, 12, '123', 2, null, { a: 10 }]);
if (averageNum === null) {
    alert('No numbers in the list');
}
else {
    alert('Average number is ' + averageNum);
}