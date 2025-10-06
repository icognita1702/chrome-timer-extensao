// Timer
let timerInterval = null;
let timerSeconds = 0;

// Cronômetro
let stopwatchInterval = null;
let stopwatchSeconds = 0;

// Relógio
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('clockDisplay').textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();

// Função para formatar tempo
function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Timer - Iniciar
document.getElementById('startTimer').addEventListener('click', () => {
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;
  
  timerSeconds = (hours * 3600) + (minutes * 60) + seconds;
  
  if (timerSeconds > 0 && !timerInterval) {
    timerInterval = setInterval(() => {
      timerSeconds--;
      document.getElementById('timerDisplay').textContent = formatTime(timerSeconds);
      
      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icon128.png',
          title: 'Timer Concluído!',
          message: 'O tempo acabou!'
        });
      }
    }, 1000);
  }
});

// Timer - Pausar
document.getElementById('pauseTimer').addEventListener('click', () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
});

// Timer - Resetar
document.getElementById('resetTimer').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timerSeconds = 0;
  document.getElementById('timerDisplay').textContent = '00:00:00';
});

// Cronômetro - Iniciar
document.getElementById('startStopwatch').addEventListener('click', () => {
  if (!stopwatchInterval) {
    stopwatchInterval = setInterval(() => {
      stopwatchSeconds++;
      document.getElementById('stopwatchDisplay').textContent = formatTime(stopwatchSeconds);
    }, 1000);
  }
});

// Cronômetro - Pausar
document.getElementById('pauseStopwatch').addEventListener('click', () => {
  if (stopwatchInterval) {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
  }
});

// Cronômetro - Resetar
document.getElementById('resetStopwatch').addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchSeconds = 0;
  document.getElementById('stopwatchDisplay').textContent = '00:00:00';
});
