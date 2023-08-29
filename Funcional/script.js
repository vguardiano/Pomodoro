// Obtém o elemento canvas e seu contexto
const canvas = document.getElementById('circleCanvas');
const ctx = canvas.getContext('2d');

// Obtém o elemento <body> para controle de eventos de pausa
const bodyElement = document.body;

// Calcula o centro do canvas
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Tempo em SEGUNDOS para preencher o círculo menor
let fillTime = 25 * 60 + 1;
let totalSegments = 4; // Número total de segmentos

// Define constantes para os círculos
let smallCircleRadius = 205; // Raio do círculo menor
let largeCircleRadius = 220; // Raio do círculo maior
let lineWidth = 3.5; // Espessura da linha dos círculos
let segmentSpacing = 5; // Espaçamento entre segmentos em graus
let segmentAngle = ((360 - (segmentSpacing / 2 * totalSegments)) / totalSegments) * (Math.PI / 180); // Ângulo de cada segmento em radianos

// Tempo atual em segundos, tempo de pausa e identificadores de intervalo
let currentTime = 0;
let pauseTime = 0;
let intervalId;
let progressId;
let pauseIntervalId;

// Índice da cor atual, status de pausa e identificador de tecla "espaço" pressionada
let currentColorIndex = -1;
let isPaused = false;

// Função para desenhar os círculos
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

    // Desenhe o círculo maior dividido em segmentos com espaçamento
    for (let i = 0; i < totalSegments; i++) {
        const startSegmentAngle = i * (segmentAngle + (segmentSpacing / 2 * (Math.PI / 180))) - Math.PI / 2 + segmentSpacing / 2 * (Math.PI / 180);
        const endSegmentAngle = startSegmentAngle + segmentAngle - segmentSpacing / 2 * (Math.PI / 180);
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, largeCircleRadius, startSegmentAngle, endSegmentAngle);
        ctx.lineWidth = lineWidth;

        if (i <= currentColorIndex) {
            ctx.strokeStyle = '#7fadc5';
        } else {
            ctx.strokeStyle = 'grey';
        }
        
        ctx.stroke();
    }
}

// Função para desenhar o contador regressivo
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

// Função principal para controlar a animação
function main() {
    currentTime = 0;
    clearInterval(intervalId);
    clearInterval(pauseIntervalId); // Limpe o intervalo de pausa
    intervalId = setInterval(() => {
        // Limpe o canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!isHelpOpen) {
            if (!isPaused) { // Continue apenas se a tecla "espaço" não estiver pressionada
                currentTime++;
            } else {
                // Se a tecla "espaço" estiver pressionada, atualize o tempo de pausa
                pauseTime++;
            }
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


// Função para reiniciar a animação
function resetAnimation() {
    const confirmation = window.confirm('Você realmente deseja reiniciar o Pomodoro?'); // Exibe o popup de confirmação
    
    if (confirmation) {
        currentTime = 0; // Zera o contador de tempo
        pauseTime = 0; // Zera o contador de pausa
        togglePause();
        fillTime = fillTimeInput.value * 60;
        clearInterval(intervalId);
        main();
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

// Ouvinte de evento para pausar/retomar a animação e atualizar o botão
pauseButton.addEventListener('click', () => {
    if (!isHelpOpen) { // Verifique se a ajuda não está aberta
        togglePause();
    }

    // if (!isHelpOpen) {
    //     // Se o botão de Ajuda já estiver aberto, volte para o canvas
    //     textInfo.style.transition = 'opacity 0.5s ease';
    //     textInfo.style.opacity = '0';

    //     canvas.style.transition = 'opacity 0.5s ease';
    //     canvas.style.opacity = '1';

    //     // Aguarde a conclusão da transição antes de ocultar o texto de ajuda
    //     setTimeout(() => {
    //         canvas.style.display = 'block';
    //         textInfo.style.display = 'none';
    //     }, 500); // O tempo deve corresponder à duração da transição CSS

    //     isHelpOpen = !isHelpOpen; // Marque o botão de Ajuda como fechado
    // } 
});

// Ouvinte de evento para reiniciar a animação
resetButton.addEventListener('click', () => {
    resetAnimation();
});

// Ouvinte de evento de teclado para pausar/retomar e reiniciar
document.addEventListener('keyup', (event) => {
    if (!isHelpOpen) {
        if (event.key === ' ' || event.key === 'Spacebar') {
            togglePause();
        }
        if (event.key === 'r' || event.key === 'R') {
            resetAnimation();
        }
    }
});

// Elementos para exibir informações de texto
const textInfo = document.getElementById('textInfo');
const helpButton = document.getElementById('helpButton');
const helpContents = document.querySelectorAll('.help-content');

// pauseButton.classList.add('disabled-button');
// resetButton.classList.add('disabled-button');

let isCanvasVisible = true;
let isHelpOpen = false;

// Ouvinte de evento para exibir ou ocultar o canvas com uma transição de opacidade suave
helpButton.addEventListener('click', () => {
    if (isCanvasVisible) {
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
    isCanvasVisible = !isCanvasVisible;
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
    isHelpOpen = !isHelpOpen;

    // Desativar o botão de pausa quando a ajuda estiver aberta
    pauseButton.disabled = isHelpOpen;
    // Desativar o botão de reset quando a ajuda estiver aberta
    resetButton.disabled = isHelpOpen;

    // Adicionar/remover a classe CSS para definir a opacidade nos botões
    if (isHelpOpen) {
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

const fillTimeInput = document.getElementById('fillTimeInput');
const totalSegmentsInput = document.getElementById('totalSegmentsInput');

// Atualiza o valor de fillTime ao mover o slider
fillTimeInput.addEventListener('input', () => {
    const newValue = fillTimeInput.value;
    fillTime = newValue * 60 + 1;
    // resetAnimation();
    pauseTime = 0;
    saveValuesToLocalStorage();
    main();
});

// const totalSegmentsInput = document.getElementById('totalSegmentsInput');

totalSegmentsInput.addEventListener('change', () => {
    const newValue = parseInt(totalSegmentsInput.value);
    if (!isNaN(newValue)) {
        totalSegments = newValue;
        segmentAngle = ((360 - (segmentSpacing / 2 * totalSegments)) / totalSegments) * (Math.PI / 180); // Ângulo de cada segmento em radianos
        saveValuesToLocalStorage();
        main();
    }
});

// Função para armazenar os valores no localStorage
function saveValuesToLocalStorage() {
    localStorage.setItem('fillTime', fillTime);
    localStorage.setItem('totalSegments', totalSegments);
}

if (localStorage.getItem('fillTime')) {
    console.log('achei.');
    fillTime = parseInt(localStorage.getItem('fillTime'));
    fillTimeInput.value = fillTime / 60; // Atualiza o valor no input
}

if (localStorage.getItem('totalSegments')) {
    totalSegments = parseInt(localStorage.getItem('totalSegments'));
    totalSegmentsInput.value = totalSegments; // Atualiza o valor no input
}

// Inicialize a animação
main();