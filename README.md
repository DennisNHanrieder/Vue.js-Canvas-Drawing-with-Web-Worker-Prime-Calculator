# Vue.js Canvas Drawing with Web Worker Prime Calculator

## Overview  
**Vue.js Canvas Drawing with Web Worker Prime Calculator** is an interactive web application that combines creative drawing with background computation.  
Users can freely draw on an HTML canvas in random colors, while a **Web Worker** runs in the background calculating prime numbers without freezing the interface.  
The prime calculations can be paused and resumed at will, showcasing non-blocking, concurrent operations in the browser.

## Why this project exists  
This project was built to:  
- Demonstrate **Vue.js** event handling and reactivity.  
- Show how to integrate **HTML5 Canvas** drawing features in a Vue app.  
- Illustrate the use of **Web Workers** for heavy computation without affecting UI performance.  

## Features  
- **Canvas Drawing** — Draw freehand with random stroke colors.  
- **Random Colors** — Every new drawing session uses a unique color.  
- **Background Prime Calculation** — Web Worker computes primes without blocking the main thread.  
- **Pause & Resume** — Control prime calculations anytime.  
- **UI Responsiveness** — Drawing remains smooth even during heavy computation.

## Technologies used  
- **Frontend Framework:** Vue.js 3 (CDN build)  
- **Graphics:** HTML5 Canvas API  
- **Concurrency:** JavaScript Web Workers  
- **Styling:** CSS3

## How to run the project  
```bash
# 1) Clone or download the repository
git clone <https://github.com/DennisNHanrieder/hyp3u3.git>

# 2) Open index.html in your browser
```

## Dependencies & requirements  
- Modern web browser with Web Worker support  
- No server required — runs locally

## How to contribute  
1. Fork the repository and create a feature branch.  
2. Add new drawing tools, shape options, or computation types.  
3. Submit a pull request describing your changes.

## What powers the core functionality?  
- **Vue.js** — Manages reactive state and DOM events.  
- **Canvas API** — Handles drawing logic and random color generation.  
- **Web Worker API** — Performs prime number computation in the background.
