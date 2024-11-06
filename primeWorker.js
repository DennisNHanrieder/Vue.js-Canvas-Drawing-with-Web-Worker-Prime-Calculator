"use strict";


onmessage = (e) => {

    run();
}

const x = 100; //return only every xth prime

function run(){

    let p = 0; //number of primes found
    let n = 1; //number to check

    while(true){
        n++;
        let i = 2;
        let isPrime = true;
        while(isPrime && i*i < n){
            isPrime = (n % i++ !== 0);
        }
        if(isPrime && ++p % x === 0){
            postMessage(n);
        }
    }
}