"use strict";
/*
 * Hypermedia Systems & Architecture
 * http://www.fh-ooe.at/mtd
 *
 * Simple Vue.js 3 Application Template
 *
 */

Vue.createApp({
    data() {
        return {
            drawing: false,
            paused: false,   // Flag to track if the worker is paused
        };
    },

    methods: {
        startDraw() {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);

            this.ctx.fillStyle = this.ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;

            this.drawing = true;
        },

        stopDraw() {
            this.drawing = false;
        },

        doDraw(e) {
            if (this.drawing) {
                this.ctx.beginPath();
                this.ctx.arc(
                    e.clientX - this.$refs.drawCanvas.offsetLeft,
                    e.clientY - this.$refs.drawCanvas.offsetTop,
                    5,
                    0,
                    2 * Math.PI
                );
                this.ctx.fill();
            }
        },

        startPrimes() {
            // Start generating primes in the worker
            if (this.paused) {
                this.paused = false;  // Reset paused state
                this.worker.postMessage("resume");
            } else {
                this.worker.postMessage("start");
            }
        },

        pausePrimes() {
            // Pause prime generation
            this.paused = true;
            this.worker.postMessage("pause");
        },

        workerResponse(e) {
            // Show the current prime number (replace content with the latest prime)
            this.$refs.primes.innerHTML = e.data;
        },
    },

    mounted() {
        this.ctx = this.$refs.drawCanvas.getContext("2d");

        // Load and draw the logo image
        const img = document.createElement("img");

        img.onload = () => {
            this.ctx.drawImage(img, 0, 0, 400, 300);
        };
        img.src = "fhlogo.png"; // Make sure this image is in the correct location

        this.worker = new Worker("primeWorker.js");
        this.worker.onmessage = this.workerResponse; // Set up worker response handler
    },
}).mount("#app");
