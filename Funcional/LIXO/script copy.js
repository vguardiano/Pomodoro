const canvas = document.getElementById('circleCanvas');
const ctx = canvas.getContext('2d');
const bodyElement = document.body; // Obtém o elemento <body>
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const smallCircleRadius = 205; // Raio do círculo menor
const largeCircleRadius = 220; // Raio do círculo maior
const lineWidth = 3.5; // Espessura da linha dos círculos
const totalSegments = 12; // Número total de segmentos
const segmentSpacing = 5; // Espaçamento entre segmentos em graus
const segmentAngle = ((360 - (segmentSpacing / 2 * totalSegments)) / totalSegments) * (Math.PI / 180); // Ângulo de cada segmento em radianos

let fillTime = 4 * 60 + 1; // Tempo em SEGUNDOS para preencher o círculo menor

let currentTime = 0; // Tempo atual em segundos
let pauseTime = 0; // Tempo de pausa em segundos
let intervalId; // ID do intervalo
let progressId;
let pauseIntervalId; // ID do intervalo pause
let currentColorIndex = 0; // Índice da cor atual
let isPaused = false; // Verifica se a tecla "espaço" foi pressionada

function drawCircles() {
    // Defina a ponta da linha como "round"
    ctx.lineCap = "round";

    // Desenhe o círculo menor que se preenche no tempo especificado
    const startAngle = - Math.PI / 2 + segmentSpacing / 2 * (Math.PI / 180);
    const endAngle = startAngle + (2 * Math.PI * ((Math.min(currentTime, fillTime) % fillTime) / fillTime));
        
    ctx.beginPath();
    ctx.arc(centerX, centerY, smallCircleRadius, startAngle, endAngle);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = '#facf7f';
    ctx.stroke();

    // // if (!isPaused) {
    //     // Desenha um pequeno progresso para dar uma ideia de animação
    //     let fillProgress = 0;
    //     clearInterval(progressId);
    //     progressId = setInterval(() => {
    //         if (!isPaused) {
    //             fillProgress += 1/100;
    //             const nextAngle = startAngle + (2 * Math.PI * ((Math.min(currentTime + fillProgress, fillTime) % fillTime) / fillTime));
    //             ctx.beginPath(); 
    //             ctx.arc(centerX, centerY, smallCircleRadius, endAngle, nextAngle);
    //             ctx.lineWidth = lineWidth;
    //             ctx.strokeStyle = '#facf7f';
    //             ctx.stroke();
    //         }
    //     }, 10);
    // // }

    // Desenhe o círculo maior dividido em segmentos com espaçamento
    for (let i = 0; i < totalSegments; i++) {
        const startSegmentAngle = i * (segmentAngle + (segmentSpacing / 2 * (Math.PI / 180))) - Math.PI / 2 + segmentSpacing / 2 * (Math.PI / 180);
        const endSegmentAngle = startSegmentAngle + segmentAngle - segmentSpacing / 2 * (Math.PI / 180);
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, largeCircleRadius, startSegmentAngle, endSegmentAngle);
        ctx.lineWidth = lineWidth;

        if (i <= currentColorIndex) {
            ctx.strokeStyle = '#7fadc5'; // Mude a cor de um segmento se o índice atual for menor ou igual ao índice da cor atual
        } else {
            ctx.strokeStyle = 'grey'; // Caso contrário, use a cor original
        }
        
        ctx.stroke();
    }
}

function drawCountdown() {
    const timeRemaining = fillTime - currentTime;
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
    isPaused ?  ctx.fillStyle = 'rgba(245, 245, 245, 35%)' : ctx.fillStyle = '#f5f5f5'; // Cor do texto
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`${String(seconds).padStart(2, '0')}`, centerX + 35, centerY - 10);
    
    if (pauseTime > 0) {
        // ctx.clearRect(centerX + 20, centerY - 5, 70, 30);
        // ctx.clearRect(centerX + 20, centerY - 45, 70, 30);
        // ctx.clearRect(centerX - 60, centerY - 45, 70, 90);

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

function main() {
    currentTime = 0;
    clearInterval(intervalId);
    clearInterval(pauseIntervalId); // Limpe o intervalo de pausa
    intervalId = setInterval(() => {
        // Limpe o canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!isPaused) { // Continue apenas se a tecla "espaço" não estiver pressionada
            currentTime++;
        } else {
            // Se a tecla "espaço" estiver pressionada, atualize o tempo de pausa
            pauseTime++;
        }

        drawCircles();
        drawCountdown(); // Adicione esta linha para atualizar o contador de minutos e segundos
        
        if (currentTime >= fillTime) {
            // Se o círculo menor estiver completamente preenchido, aumente o índice da cor atual
            currentColorIndex = (currentColorIndex + 1) % totalSegments;
            currentTime = 0;
            pauseTime = 0;
        }
    }, 1000);
}

// Inicialize
main();

// Função para reiniciar a animação
function resetAnimation() {
    const confirmation = window.confirm('Você realmente deseja reiniciar o Pomodoro?'); // Exibe o popup de confirmação
    
    if (confirmation) {
        currentTime = 0; // Zera o contador de tempo
        pauseTime = 0; // Zera o contador de pausa
        togglePause();
        // isPaused = false; // Garante que a animação não esteja pausada
        // pauseButton.innerHTML = 'Pausar'; // Atualiza o texto do botão de pausa
    }
}

// Função para pausar/retomar a animação e atualizar o botão
function togglePause() {
    if (isPaused) {
        // A animação está pausada
        pauseButton.innerHTML = 'Pausar'; // Muda o texto para "Pausar"
        pauseButton.classList.remove('active');
    } else {
        // A animação está em execução
        pauseButton.innerHTML = 'Retomar'; // Muda o texto de volta para "Retomar"
        pauseButton.classList.add('active');
    }
    isPaused = !isPaused;
}

const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const helpButton = document.getElementById('helpButton');

// Ouvinte de evento para pausar/retomar a animação e atualizar o botão
pauseButton.addEventListener('click', () => {
    togglePause();
});

// Ouvinte de evento para reiniciar a animação
resetButton.addEventListener('click', () => {
    resetAnimation();
});

// Ouvinte de evento de teclado
document.addEventListener('keyup', (event) => {
    if (event.key === ' ' || event.key === 'Spacebar') {
        togglePause();
    }
    if (event.key === 'r' || event.key === 'R') {
        resetAnimation();
    }
});

// const canvas = document.getElementById('circleCanvas');
const textInfo = document.getElementById('textInfo');
// const showHelpButton = document.getElementById('showHelpButton');

helpButton.addEventListener('click', () => {
    // Esconde o canvas e exibe as informações de texto
    canvas.style.display = 'none';
    textInfo.style.display = 'block';
});
