// timer.js

import { drawCircles, drawCountdown, canvas, ctx } from './canvas.js'
import ui from './ui.js'

export let intervalId;
export let progressId;
export let pauseIntervalId;

// export function runPomodoroTimer(ui.maxTime, ui.totalSegments, ui.currentTime, ui.pauseTime, ui.smallCircleRadius, ui.largeCircleRadius, ui.lineWidth, ui.segmentSpacing, ui.currentColorIndex, ui.isHelpOpen, ui.isPaused) {
export function runPomodoroTimer() {
  clearInterval(intervalId);
  clearInterval(pauseIntervalId); // Limpe o intervalo de pausa
  
  intervalId = setInterval(() => {
    if (ui.currentTime >= ui.maxTime - 1) {
      // Se o círculo menor estiver completamente preenchido, aumente o índice da cor atual
      ui.currentColorIndex = (ui.currentColorIndex + 1) % ui.totalSegments;
      ui.currentTime = 0;
      ui.pauseTime = 0;
    }

    // Chame a função para atualizar o título
    updatePageTitle(ui.maxTime, ui.currentTime);

    // Limpe o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (staticBackdrop.style.display === 'block') {
      ui.isHelpOpen = true;
    } else {
      ui.isHelpOpen = false;
    }

    // console.log(ui.isHelpOpen);

    if (!ui.isHelpOpen) {
      !ui.isPaused ? ui.currentTime++ : ui.pauseTime++;
    }

    drawCircles(ui.maxTime, ui.totalSegments, ui.currentTime, ui.smallCircleRadius, ui.largeCircleRadius, ui.lineWidth, ui.segmentSpacing, ui.currentColorIndex);
    drawCountdown(ui.maxTime, ui.currentTime, ui.pauseTime, ui.isPaused);

  }, 1000);
}


// Função para atualizar o título da página
function updatePageTitle(maxTime, currentTime) {
  const timeDifference = maxTime - currentTime - 1;
  const minutes = Math.floor(timeDifference / 60);
  const seconds = timeDifference % 60;
  
  document.title = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const textInfo = document.getElementById('textInfo');
const helpButton = document.getElementById('helpButton');
const helpContents = document.querySelectorAll('.help-content');

const staticBackdrop = document.getElementById('staticBackdrop');

export function eventListener() {
  document.addEventListener('DOMContentLoaded', () => {
    // Event listener para o botão de pausa
    pauseButton.addEventListener('click', () => {
      togglePauseButton(pauseButton);
    });

    // // Event listener para o botão de reinício
    resetButton.addEventListener('click', () => {

    });

    // Ouvinte de evento para exibir ou ocultar o canvas com uma transição de opacidade suave
    helpButton.addEventListener('click', () => {

    });

    // Event listener para pressionamento de tecla (por exemplo, barra de espaço)
    document.addEventListener('keyup', (event) => {
      if (event.key === ' ' || event.key === 'Spacebar') {
        togglePauseButton(pauseButton);
      }
    });
  });
}

function togglePauseButton(pauseButton) {
  ui.isPaused = !ui.isPaused;

  if (ui.isPaused) {
    // A animação está pausada
    pauseButton.innerHTML = 'Retomar'; // Muda o texto para "Retomar"
    pauseButton.style.backgroundColor = 'grey'; // Muda o fundo para branco
  } else {
    // A animação está em execução
    pauseButton.innerHTML = 'Pausar'; // Muda o texto de volta para "Pausar"
    pauseButton.style.backgroundColor = 'rgb(33 33 33 / 44%)'; // Muda o fundo de volta para a cor original
  }
}