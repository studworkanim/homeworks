'use strict';

const INTERVAL_MS = 1000;
const SECONDS_IN_MINUTE = 60;

const timerLabelEl = document.querySelector('.timer');
let currentTimeSec = 13;

function start() {
    const countDownInterval = setInterval(() => {        
        if (currentTimeSec < 0) {
            clearInterval(countDownInterval);
            timerLabelEl.textContent = 'Time is up';
            return;
        }

        const timerMinutes = Math.floor(currentTimeSec / SECONDS_IN_MINUTE);
        const timerSeconds = currentTimeSec % SECONDS_IN_MINUTE;
        timerLabelEl.textContent = `${String(timerMinutes).padStart(2, '0')}:${String(timerSeconds).padStart(2, '0')}`;
        currentTimeSec--;

    }, INTERVAL_MS);
};

start();