// canvas.js

import { colorCodes } from './ui.js'

export const canvas = document.getElementById('circleCanvas');
export const ctx = canvas.getContext('2d');

// Calcula o centro do canvas
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Funções relacionadas ao canvas
export function drawCircles(maxTime, totalSegments, currentTime, smallCircleRadius, largeCircleRadius, lineWidth, segmentSpacing, currentColorIndex) {
    let segmentAngle = ((360 - (segmentSpacing / 2 * totalSegments)) / totalSegments) * (Math.PI / 180); // Ângulo de cada segmento em radianos
    
    // Defina a ponta da linha como "round"
    ctx.lineCap = "round";

    // Desenhe o círculo menor que se preenche no tempo especificado
    const startAngle = - Math.PI / 2 + segmentSpacing / 2 * (Math.PI / 180);
    const endAngle = startAngle + (2 * Math.PI * ((Math.min(currentTime, maxTime) % maxTime) / maxTime));
        
    ctx.beginPath();
    ctx.arc(centerX, centerY, smallCircleRadius, startAngle, endAngle);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = colorCodes.smallCircleColor;
    ctx.stroke();

    // Desenhe o círculo maior dividido em segmentos com espaçamento
    for (let i = 0; i < totalSegments; i++) {
        const startSegmentAngle = i * (segmentAngle + (segmentSpacing / 2 * (Math.PI / 180))) - Math.PI / 2 + segmentSpacing / 2 * (Math.PI / 180);
        const endSegmentAngle = startSegmentAngle + segmentAngle - segmentSpacing / 2 * (Math.PI / 180);
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, largeCircleRadius, startSegmentAngle, endSegmentAngle);
        ctx.lineWidth = lineWidth;

        if (i <= currentColorIndex - 1) {
            ctx.strokeStyle = colorCodes.completePomodoroColor;
            ctx.lineWidth = lineWidth * 1.7;
        } else {
            ctx.strokeStyle = colorCodes.incompletePomodoroColor;
        }
        
        ctx.stroke();
    }
}

export function drawCountdown(maxTime, currentTime, pauseTime, isPaused) {
    const timeRemaining = maxTime - currentTime;
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    
    // Define o estilo da fonte Open Sans Condensed
    ctx.font = '90px "Open Sans Condensed", sans-serif';
    isPaused ? ctx.fillStyle = 'rgba(245, 245, 245, 35%)' : ctx.fillStyle = '#f5f5f5'; // Cor do texto
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${String(minutes).padStart(2, '0')}`, centerX - 20, centerY);

    // Define o estilo da fonte Open Sans Condensed
    ctx.font = '30px "Open Sans Condensed", sans-serif';
    isPaused ? ctx.fillStyle = 'rgba(245, 245, 245, 35%)' : ctx.fillStyle = '#f5f5f5'; // Cor do texto
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`${String(seconds).padStart(2, '0')}`, centerX + 35, centerY - 10);
    
    if (pauseTime > 0) {
        // Adicione o tempo de pausa ao tempo restantes
        const pauseMinutes = Math.floor(pauseTime / 60);
        const pauseSeconds = pauseTime % 60;
        const stringPause = `${pauseMinutes > 0 ? String(pauseMinutes).padStart(2, '0')+`:` : ''}${String(pauseSeconds).padStart(2, '0')}`

        !isPaused ? ctx.fillStyle = 'rgba(255, 68, 132, 30%)' : ctx.fillStyle = '#ff4484'; // Cor do texto
        
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(stringPause, centerX + 23, centerY + 1);
    }
}
