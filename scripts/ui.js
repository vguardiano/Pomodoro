// ui.js

export const colorCodes = {
  smallCircleColor: "#facf7f",
  completePomodoroColor: "#7fadc5",
  incompletePomodoroColor: "#808080",
  timerColor: "#f5f5f5",
  side: "#369"
};

export default {
    maxTime: 0 * 60 + 10, // Marcador de tempo de um pomodoro em segundos
    totalSegments: 5, // Marcador de meta de ciclos de pomodoros
    currentTime: 0, // Marcador de tempo atual decorrido em segundos
    pauseTime: 0, // Marcador de tempo pausado decorrido em segundos
    currentColorIndex: 0, // Marcador de pomodoros concluídos
    smallCircleRadius: 205, // Raio do círculo menor
    largeCircleRadius: 220, // Raio do círculo maior
    lineWidth: 3.5, // Espessura da linha dos círculos
    segmentSpacing: 5, // Espaçamento entre segmentos em graus
    isPaused: false, // Indica se a animação está pausada (inicialmente, não está pausada)
    isHelpOpen: false, // Indica se o botão de ajuda está aberto (inicialmente, não está aberto)
    isCanvasVisible: true, // Indica se o canvas é visível (inicialmente, é visível)
};

// export let fillTime = 0 * 60 + 10; // Marcador de tempo de um pomodoro em segundos
// export let totalSegments = 5; // Marcador de meta de ciclos de pomodoros
// export let currentTime = 0; // Marcador de tempo atual decorrido em segundos
// export let pauseTime = 0; // Marcador de tempo pausado decorrido em segundos
// export let currentColorIndex = 0; // Marcador de pomodoros concluídos
// export let smallCircleRadius = 205; // Raio do círculo menor
// export let largeCircleRadius = 220; // Raio do círculo maior
// export let lineWidth = 3.5; // Espessura da linha dos círculos
// export let segmentSpacing = 5; // Espaçamento entre segmentos em graus

// export let isPaused = false; // Indica se a animação está pausada (inicialmente, não está pausada)
// export let isHelpOpen = false; // Indica se o botão de ajuda está aberto (inicialmente, não está aberto)
// export let isCanvasVisible = true; // Indica se o canvas é visível (inicialmente, é visível)