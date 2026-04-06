// ===== Floating Hearts =====
function createFloatingHearts(containerId) {
    const container = document.getElementById(containerId);
    for (let i = 0; i < 25; i++) {
        const span = document.createElement('span');
        span.textContent = '❤';
        span.style.left = Math.random() * 100 + '%';
        span.style.fontSize = (Math.random() * 20 + 10) + 'px';
        span.style.opacity = Math.random() * 0.5 + 0.3;
        span.style.animationDuration = (Math.random() * 5 + 5) + 's';
        span.style.animationDelay = (Math.random() * 8) + 's';
        container.appendChild(span);
    }
}
createFloatingHearts('hearts-1');
createFloatingHearts('hearts-2');
createFloatingHearts('hearts-3');

// ===== Page Navigation =====
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// ===== Page 1: Password =====
const passwordForm = document.getElementById('password-form');
const passwordInput = document.getElementById('password-input');
const passwordCard = document.getElementById('password-card');
const errorMsg = document.getElementById('error-msg');

passwordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (passwordInput.value.toLowerCase() === 'love') {
        showPage('page-message');
        startTyping();
        // Play audio
        const audio = document.getElementById('romantic-audio');
        audio.volume = 0.3;
        audio.play().catch(() => {});
    } else {
        errorMsg.classList.remove('hidden');
        passwordCard.style.animation = 'shake 0.5s ease-in-out, pulse-glow 2s ease-in-out infinite';
        setTimeout(() => {
            passwordCard.style.animation = 'pulse-glow 2s ease-in-out infinite';
        }, 500);
    }
});

passwordInput.addEventListener('input', function() {
    errorMsg.classList.add('hidden');
});

// ===== Page 2: Typing Effect =====
const fullText = `من أول يوم شفتك فيه، عرفت إن حياتي هتتغير...

مش عارف أقولك قد إيه إنت مهم في حياتي،
كل لحظة معاك بتكون أحلى من اللي قبلها.

بحبك من كل قلبي 💕

كل ذكرى معاك هي كنز بالنسبالي،
وكل يوم بيعدي بيزيدني حب ليك.

إنت أجمل حاجة حصلتلي في حياتي ❤️`;

let currentIndex = 0;
const typedText = document.getElementById('typed-text');
const nextBtn = document.getElementById('next-btn');

function startTyping() {
    if (currentIndex < fullText.length) {
        typedText.textContent = fullText.slice(0, currentIndex + 1);
        currentIndex++;
        setTimeout(startTyping, 50);
    } else {
        nextBtn.classList.remove('hidden');
        nextBtn.classList.add('fade-in');
    }
}

function goToMemory() {
    showPage('page-memory');
    startTimer();
}

// ===== Page 3: Timer =====
const START_DATE = new Date('2016-06-01T00:00:00');

function startTimer() {
    function update() {
        const now = new Date();
        const diff = now.getTime() - START_DATE.getTime();
        document.getElementById('timer-days').textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('timer-hours').textContent = Math.floor((diff / (1000 * 60 * 60)) % 24);
        document.getElementById('timer-minutes').textContent = Math.floor((diff / (1000 * 60)) % 60);
        document.getElementById('timer-seconds').textContent = Math.floor((diff / 1000) % 60);
    }
    update();
    setInterval(update, 1000);
}



const audio = document.getElementById("romantic-audio");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const volumeControl = document.getElementById("volumeControl");

// Play / Pause
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  }
});

// تحديث progress
audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress || 0;
});

// التحكم في التقديم
progressBar.addEventListener("input", () => {
  const time = (progressBar.value / 100) * audio.duration;
  audio.currentTime = time;
});

// الصوت
volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
});
