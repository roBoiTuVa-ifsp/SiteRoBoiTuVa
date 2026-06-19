// --- Configurações e Estado Global ---
let soundEnabled = false;
let audioCtx = null;

// Inicializa o Contexto de Áudio sob demanda
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// Sintetiza efeitos sonoros usando a Web Audio API
function playSound(type) {
  if (!soundEnabled) return;
  initAudio();
  
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  const now = audioCtx.currentTime;
  
  switch(type) {
    case 'click':
      // Beep curto e agudo
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      gainNode.gain.setValueAtTime(0.05, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
      break;
    case 'hover':
      // Chirp suave e rápido
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1500, now + 0.04);
      gainNode.gain.setValueAtTime(0.02, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
      break;
    case 'error':
      // Som grave de erro estático
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.2);
      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
      break;
    case 'typing':
      // Ruído rápido de digitação
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(randomRange(500, 1000), now);
      gainNode.gain.setValueAtTime(0.03, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
      osc.start(now);
      osc.stop(now + 0.02);
      break;
    case 'startup':
      // Som de inicialização multitom
      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.setValueAtTime(440, now + 0.06);
      osc.frequency.setValueAtTime(660, now + 0.12);
      osc.frequency.setValueAtTime(880, now + 0.18);
      gainNode.gain.setValueAtTime(0.04, now);
      gainNode.gain.setValueAtTime(0.04, now + 0.18);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
      break;
  }
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

// --- Controles de Áudio da UI ---
const audioToggleBtn = document.getElementById('audio-toggle-btn');
const soundOnIcon = document.getElementById('sound-on-icon');
const soundOffIcon = document.getElementById('sound-off-icon');

audioToggleBtn.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    audioToggleBtn.classList.add('active');
    soundOnIcon.style.display = 'block';
    soundOffIcon.style.display = 'none';
    playSound('startup');
  } else {
    audioToggleBtn.classList.remove('active');
    soundOnIcon.style.display = 'none';
    soundOffIcon.style.display = 'block';
  }
});

// Adiciona eventos de som nos botões e links
document.querySelectorAll('button, a, .tech-btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (!el.disabled && !el.classList.contains('empty-link')) {
      playSound('hover');
    }
  });
  el.addEventListener('click', () => {
    if (el.disabled || el.classList.contains('empty-link')) {
      playSound('error');
    } else {
      playSound('click');
    }
  });
});

// --- Relógio HUD Dinâmico ---
function updateSystemClock() {
  const clockEl = document.getElementById('system-time');
  const now = new Date();
  const formatDigit = (d) => String(d).padStart(2, '0');
  
  const timeString = `${formatDigit(now.getUTCHours())}:${formatDigit(now.getUTCMinutes())}:${formatDigit(now.getUTCSeconds())} UTC`;
  clockEl.textContent = timeString;
}
setInterval(updateSystemClock, 1000);
updateSystemClock();

// --- Rolar Suave até a Seção ---
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// --- Banco de Dados Interativo do Terminal (Traduzido) ---
const techDatabase = {
  python: {
    status: "INTEGRAÇÃO ONLINE",
    description: "Desenvolvimento de inteligência artificial de ponta, processamento paralelo e algoritmos de visão computacional aplicados.",
    metrics: [
      { label: "MÓDULOS ATIVOS", value: "Computer Vision, OpenCV, PyTorch" },
      { label: "USO PRINCIPAL", value: "Deep Learning & Processamento de Sinais" },
      { label: "COMPATIBILIDADE", value: "Sistemas Embarcados / Linux" },
      { label: "NÍVEL DE INTEGRALIZAÇÃO", value: "92%", highlight: true }
    ],
    logs: [
      "Carregando interpretador Python v3.11...",
      "Iniciando bibliotecas de manipulação matricial (NumPy)...",
      "Processadores neurais carregados com sucesso.",
      "Aguardando coordenadas da câmera para detecção de objetos."
    ]
  },
  scratch: {
    status: "STANDBY // NÚCLEO EDUCACIONAL",
    description: "Ferramenta essencial para o ensino de lógica computacional e projetos acadêmicos de extensão da comunidade do IFSP.",
    metrics: [
      { label: "PÚBLICO-ALVO", value: "Escolas e Comunidade Externa" },
      { label: "MÉTODO DE ENSINO", value: "Workshops baseados em Blocos Lógicos" },
      { label: "OBJETIVO CORE", value: "Disseminação Científica" },
      { label: "GRAU DE IMPACTO", value: "EXCELENTE", highlight: true }
    ],
    logs: [
      "Iniciando Interface Core do Scratch...",
      "Mapeando sequências algorítmicas básicas...",
      "Status dos blocos de controle: SEGUNDA CAMADA INICIALIZADA.",
      "Pronto para simulação lógica de algoritmos simplificados."
    ]
  },
  "ia-robotica": {
    status: "HEURÍSTICA OPERACIONAL DO CORE",
    description: "Pesquisa e implementação de IA adaptativa em sistemas autônomos. Motores de decisão orientados a leituras de sensores.",
    metrics: [
      { label: "HARDWARE DE PROCESSAMENTO", value: "Jetson Nano & Coral Edge TPU" },
      { label: "SISTEMA COGNITIVO", value: "Redes Neurais Convolucionais" },
      { label: "CONTROLE DE ATUADORES", value: "PID Controller Adaptativo" },
      { label: "STATUS DE OPERAÇÃO", value: "MÁXIMO RENDIMENTO", highlight: true }
    ],
    logs: [
      "Carregando pesos neurais (Neural Weights v2.4)...",
      "Calibrando sensores de distância ultrassônicos e giroscópios...",
      "Heurística de evasão de colisão carregada no núcleo de processamento.",
      "Rede Convolucional ativada no barramento PCI Express local."
    ]
  },
  "lego-ev3": {
    status: "CALIBRAÇÃO DE DOCA ATIVA",
    description: "Plataforma física principal para prototipagem ágil e competições regionais. Foco em estabilidade estrutural e tração.",
    metrics: [
      { label: "FIRMWARE EMBARCADO", value: "ev3dev / Kernel Python" },
      { label: "CONFIGURAÇÃO DE CHASSI", value: "Rodas Direcionais / Lagartas" },
      { label: "PROTOCOLOS DE COMUNICAÇÃO", value: "Bluetooth Low Energy / WiFi" },
      { label: "TAXA DE RESPOSTA", value: "4ms", highlight: true }
    ],
    logs: [
      "Pingando Brick EV3 via IP local... Resposta recebida.",
      "Carregando encoders dos Servo Motores A, B e C...",
      "Calibrando Sensor de Cor (Refletância de linha = 62%).",
      "Sincronização de atuadores finalizada. Aguardando comando de partida."
    ]
  },
  eletronica: {
    status: "REDE DE TENSÃO NORMAL",
    description: "Montagem de circuitos dedicados, barramentos de energia eficientes e microcontroladores integrados (Arduino/ESP32).",
    metrics: [
      { label: "PLATAFORMA BASE", value: "ESP32 DevKit v1 & Arduino Nano" },
      { label: "ALIMENTAÇÃO ELÉTRICA", value: "Bateria LiPo 2S 7.4V Grid Regulada" },
      { label: "BARRAMENTO DE COMUNICAÇÃO", value: "I2C / SPI / UART" },
      { label: "CORRENTE DA REDE", value: "ESTÁVEL // 1.2A Máx", highlight: true }
    ],
    logs: [
      "Leitura dos barramentos analógicos do conversor ADC...",
      "Verificando integridade das portas GPIO...",
      "Ruído elétrico detectado: 0.02% (filtro passa-baixa ativo).",
      "Alimentação de sensores ativada no pino de 5V."
    ]
  }
};

const techButtons = document.querySelectorAll('.tech-btn');
const consoleOutput = document.getElementById('console-output');
const consoleStatus = document.getElementById('console-status');

let currentTypingTimeout = null;

function renderTechDetails(techKey) {
  if (currentTypingTimeout) clearTimeout(currentTypingTimeout);
  
  const tech = techDatabase[techKey];
  if (!tech) return;

  // Atualiza a cor de status do terminal
  consoleStatus.textContent = tech.status;
  if (tech.status.includes("STANDBY") || tech.status.includes("DOCA")) {
    consoleStatus.style.color = "var(--color-gray)";
  } else {
    consoleStatus.style.color = "var(--color-red)";
  }

  consoleOutput.innerHTML = '';
  
  const logsContainer = document.createElement('div');
  logsContainer.style.display = 'flex';
  logsContainer.style.flexDirection = 'column';
  logsContainer.style.gap = '5px';
  consoleOutput.appendChild(logsContainer);

  let logIndex = 0;
  
  function typeNextLog() {
    if (logIndex < tech.logs.length) {
      const line = document.createElement('div');
      line.className = 'console-line';
      line.innerHTML = `
        <span class="console-prompt">&gt;</span>
        <span class="console-text">${tech.logs[logIndex]}</span>
      `;
      logsContainer.appendChild(line);
      playSound('typing');
      logIndex++;
      
      consoleOutput.scrollTop = consoleOutput.scrollHeight;
      currentTypingTimeout = setTimeout(typeNextLog, 180);
    } else {
      const descLine = document.createElement('div');
      descLine.style.marginTop = '15px';
      descLine.innerHTML = `<span style="color: var(--color-white); font-weight: bold;">[DESCRITIVO]:</span> ${tech.description}`;
      consoleOutput.appendChild(descLine);
      
      const panel = document.createElement('div');
      panel.className = 'tech-status-panel';
      
      tech.metrics.forEach(m => {
        const item = document.createElement('div');
        item.className = 'tech-status-item';
        item.innerHTML = `
          <div class="tech-status-label">${m.label}</div>
          <div class="tech-status-value ${m.highlight ? 'glowing' : ''}">${m.value}</div>
        `;
        panel.appendChild(item);
      });
      
      consoleOutput.appendChild(panel);
      consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }
  }

  typeNextLog();
}

// Ouvintes de evento do terminal
techButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    techButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const techKey = btn.getAttribute('data-tech');
    renderTechDetails(techKey);
  });
});

// Renderização inicial
renderTechDetails('python');

// --- Lógica de Filtro dos Integrantes ---
const filterButtons = document.querySelectorAll('.filter-btn');
const crewCards = document.querySelectorAll('.crew-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    crewCards.forEach(card => {
      const category = card.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// --- Loop do Título Glitch ---
const glitchTitle = document.getElementById('glitch-title');
setInterval(() => {
  glitchTitle.style.animation = 'glitch-text 0.3s ease';
  setTimeout(() => {
    glitchTitle.style.animation = 'none';
  }, 300);
}, 6000);

// --- Background de Rede de Partículas Interativa ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const particles = [];
const particleCount = 45;
const connectionDistance = 140;

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = Math.random() * 2 + 1;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 18, 33, 0.4)';
    ctx.fill();
  }
}

// Inicializa as partículas
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

// Rastreamento do mouse
const mouse = { x: null, y: null, maxDist: 180 };
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

// Loop de animação
function animate() {
  ctx.clearRect(0, 0, width, height);
  
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  
  // Desenha conexões
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const p1 = particles[i];
      const p2 = particles[j];
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      
      if (dist < connectionDistance) {
        const alpha = (1 - dist / connectionDistance) * 0.12;
        ctx.strokeStyle = `rgba(255, 18, 33, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
    
    // Conecta com a posição do mouse
    if (mouse.x !== null && mouse.y !== null) {
      const p = particles[i];
      const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      
      if (dist < mouse.maxDist) {
        const alpha = (1 - dist / mouse.maxDist) * 0.18;
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }
  
  requestAnimationFrame(animate);
}

animate();
