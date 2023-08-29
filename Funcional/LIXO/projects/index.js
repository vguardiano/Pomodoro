const canvas = document.getElementById('circleCanvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 70; // Raio do círculo
const lineWidth = 10; // Espessura da linha do círculo

let currentTime = 0; // Tempo atual em segundos
const totalTime = 60; // Tempo total em segundos (altere conforme necessário)

function drawCircle() {
    // Limpe o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhe o círculo de fundo
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = 'lightgray';
    ctx.stroke();

    // Desenhe o círculo de preenchimento
    const progress = currentTime / totalTime;
    const endAngle = (2 * Math.PI * progress) - Math.PI / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, endAngle);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = 'blue';
    ctx.stroke();
}

// Atualize o tempo e desenhe o círculo a cada segundo
setInterval(() => {
    if (currentTime < totalTime) {
        currentTime++;
        drawCircle();
    }
}, 1000);
