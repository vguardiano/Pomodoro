// favicon.js 

// Importa as variáveis e funções necessárias de outros módulos
// import { colorCodes, currentTime, ui.maxTime } from './ui.js';

import ui from './ui.js'

// Obtém o elemento canvas com o ID 'favIconCanvas'
const cv = document.getElementById('favIconCanvas');

// Inicializa o contexto 2D com um valor nulo (será definido posteriormente)
let ctx = cv.getContext('2d');

// Define o ângulo inicial para desenhar o círculo (1.5 * Math.PI representa o topo do círculo)
const angle = 1.5 * Math.PI;

// Inicializa o temporizador
let tc = 0;
let time = 0;

// Calcula a porcentagem de conclusão com base no currentTime e ui.maxTime
let percentage = (ui.currentTime / ui.maxTime) * 100;


// Obtém o elemento <link> com o atributo 'rel' que contém 'icon' (usado para o favicon)
let lnk = document.querySelector('link[rel*="icon"]');

// Define uma função para ser executada quando a página é carregada
onload = function() {
  // Verifica se o contexto 2D foi obtido com sucesso
  // if (ctx) {
    // Inicializa o temporizador para chamar a função 'updateLoader' a cada 1000 milissegundos (1 segundo)
    tc = setInterval(updateLoader, 1000);
  // } 
};

// Função para atualizar o favicon com base no preenchimento do círculo de progresso
function updateLoader() {
  percentage = (ui.currentTime / ui.maxTime) * 100;

  // Verifica se o contexto 2D foi obtido com sucesso
  if (ctx) {
    // Limpa o canvas
    ctx.clearRect(0, 0, 32, 32);

    // Inicia um novo caminho (path) para desenhar um arco de círculo
    ctx.beginPath();

    // Desenha um arco de círculo com base na porcentagem concluída
    // ctx.arc(16, 16, 10, angle, 2* Math.PI);// (percentage * 2 * Math.PI / 100 + angle));
    ctx.arc(16, 16, 10, angle, (percentage * 2 * Math.PI / 100 + angle));

    // Conecta o ponto final do arco ao centro do círculo para preenchê-lo
    ctx.lineTo(16, 16);

    // Define a largura da linha para o desenho
    ctx.lineWidth = 6;
    
    // Define a cor da linha para o desenho (amarelo)
    ctx.fillStyle = 'red';

    // Preenche o arco de círculo
    ctx.fill();

    // Atualiza o link do favicon com a imagem do canvas (atualiza o favicon)
    lnk.href = cv.toDataURL('image/png');

    // Verifica se a porcentagem atingiu 100%
    if (percentage >= 100) {
      time = 0;
      // Limpa o temporizador (para de chamar a função 'updateLoader')
      clearInterval(tc);
      tc = setInterval(updateLoader, 1000); // Reinicia o temporizador para atualizações contínuas
      // Retorna, encerrando a função
      // return;
    }
  }
}