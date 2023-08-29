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
    // eventListener();
    // console.log(ui.isPaused)

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

export function eventListener() {
  document.addEventListener('DOMContentLoaded', () => {
    // Event listener para o botão de pausa
    pauseButton.addEventListener('click', () => {
      togglePauseButton(pauseButton);
      // if (!ui.isHelpOpen) {
      //   // Se o botão de Ajuda já estiver aberto, volte para o canvas
      //   textInfo.style.transition = 'opacity 0.5s ease';
      //   textInfo.style.opacity = '0';

      //   canvas.style.transition = 'opacity 0.5s ease';
      //   canvas.style.opacity = '1';

      //   // Aguarde a conclusão da transição antes de ocultar o texto de ajuda
      //   setTimeout(() => {
      //       canvas.style.display = 'block';
      //       textInfo.style.display = 'none';
      //   }, 500); // O tempo deve corresponder à duração da transição CSS

      //   ui.isHelpOpen = !ui.isHelpOpen; // Marque o botão de Ajuda como fechado
      // } 
    });

    // Event listener para o botão de reinício
    resetButton.addEventListener('click', () => {
      
    });

    // Ouvinte de evento para exibir ou ocultar o canvas com uma transição de opacidade suave
    helpButton.addEventListener('click', () => {
      if (ui.isCanvasVisible) {
        // Se o canvas estiver visível, oculta-o suavemente
        canvas.style.transition = 'opacity 0.5s';
        canvas.style.opacity = '0';

        // Espera até que a transição termine antes de ocultar o canvas
        setTimeout(() => {
          canvas.style.display = 'none';
        }, 500); // 500ms é a duração da transição
      } else {
        // Se o canvas estiver oculto, exibe-o suavemente
        canvas.style.transition = 'opacity 0.5s';
        canvas.style.display = 'block';

        // Espera um pequeno atraso antes de iniciar a transição de opacidade
        setTimeout(() => {
          canvas.style.opacity = '1';
        }, 10);
      }

      // Alterna o estado de visibilidade do canvas
      ui.isCanvasVisible = !ui.isCanvasVisible;
      // togglePause()

      // Alternar a visibilidade dos elementos de ajuda ao pressionar o botão "Ajuda"
      helpContents.forEach(content => {
        if (content.style.display === 'none' || content.style.display === '') {
          content.style.display = 'block';
        } else {
          content.style.display = 'none';
        }
      });

      // Atualize o estado de isHelpOpen
      ui.isHelpOpen = !ui.isHelpOpen;

      // Desativar o botão de pausa quando a ajuda estiver aberta
      pauseButton.disabled = ui.isHelpOpen;
      // Desativar o botão de reset quando a ajuda estiver aberta
      resetButton.disabled = ui.isHelpOpen;

      // Adicionar/remover a classe CSS para definir a opacidade nos botões
      if (ui.isHelpOpen) {
        pauseButton.classList.add('disabled-button');
        resetButton.classList.add('disabled-button');
        pauseButton.style.opacity = '0'; // Defina o valor desejado (por exemplo, 0.5 para 50% de opacidade)
        resetButton.style.opacity = '0';
      } else {
        pauseButton.style.opacity = '1'; // Defina o valor desejado (por exemplo, 0.5 para 50% de opacidade)
        resetButton.style.opacity = '1';
        pauseButton.classList.remove('disabled-button');
        resetButton.classList.remove('disabled-button');
      }
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