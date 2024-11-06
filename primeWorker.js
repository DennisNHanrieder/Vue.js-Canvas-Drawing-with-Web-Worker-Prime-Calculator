"use strict";

let paused = false;
let primeInterval = null;

let currentN = 1;
let currentPrimeCount = 0;

function generatePrimes() {
    function findPrime() {
        if (paused) return;

        currentN++;
        let i = 2;
        let isPrime = true;
        while (isPrime && i * i < currentN) {
            isPrime = (currentN % i++ !== 0);
        }

        if (isPrime && ++currentPrimeCount % 100 === 0) {
            postMessage(currentN);
        }


        primeInterval = setTimeout(findPrime, 10);
    }

    findPrime();
}

onmessage = (e) => {
    if (e.data === "start") {
        generatePrimes();
    } else if (e.data === "pause") {
        paused = true;
        clearTimeout(primeInterval);
        postMessage({ paused: true, n: currentN, primeCount: currentPrimeCount });
    } else if (e.data === "resume") {
        paused = false;
        postMessage({ paused: false, n: currentN, primeCount: currentPrimeCount });
        generatePrimes();
    }
};

onmessage({ data: "start" });
