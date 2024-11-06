"use strict";

// Worker state variables
let paused = false;  // Flag to track if the worker is paused
let primeInterval = null; // Store the interval ID for pausing/resuming

// Store the current state of the worker
let currentN = 1;  // Current number being checked for primality
let currentPrimeCount = 0;  // Number of primes found so far

// Function to start generating primes
function generatePrimes() {
    function findPrime() {
        if (paused) return; // Pause the generation

        currentN++;  // Increment the number to check
        let i = 2;
        let isPrime = true;
        while (isPrime && i * i < currentN) {
            isPrime = (currentN % i++ !== 0);
        }

        // If it's a prime and we reach the nth prime we want to send, send it to the main thread
        if (isPrime && ++currentPrimeCount % 100 === 0) {
            postMessage(currentN);  // Send prime to main thread
        }

        // Continue the loop after a small delay (to simulate a non-blocking environment)
        primeInterval = setTimeout(findPrime, 10); // Reduced timeout for faster prime generation
    }

    findPrime();  // Start finding primes
}

// Start or resume the worker when "start" or "resume" is requested
onmessage = (e) => {
    if (e.data === "start") {
        generatePrimes();  // Start the prime generation from the beginning
    } else if (e.data === "pause") {
        paused = true;  // Set paused flag
        clearTimeout(primeInterval);  // Stop the prime generation loop
        // Save the current state
        postMessage({ paused: true, n: currentN, primeCount: currentPrimeCount });
    } else if (e.data === "resume") {
        paused = false;  // Clear the paused flag
        // Start the prime generation from where it left off
        postMessage({ paused: false, n: currentN, primeCount: currentPrimeCount });
        generatePrimes();  // Resume the prime generation
    }
};

// Initialize the worker state when it starts or resumes
onmessage({ data: "start" });
