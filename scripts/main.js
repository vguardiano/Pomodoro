// main.js

// import { drawCircles, drawCountdown } from './canvas.js'
// import { maxTime, totalSegments, currentTime, pauseTime, currentColorIndex, smallCircleRadius, largeCircleRadius, lineWidth, segmentSpacing, isPaused, isHelpOpen, isCanvasVisible } from './ui.js';

import { drawCircles, drawCountdown, canvas, ctx } from './canvas.js'
import ui from './ui.js'
import { runPomodoroTimer, eventListener } from './timer.js'

runPomodoroTimer();
eventListener();
