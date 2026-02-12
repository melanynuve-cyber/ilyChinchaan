// ============================================
// FUNCIÓN: Escapar el botón "No"
// ============================================
function escapeButton(button) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const buttonRect = button.getBoundingClientRect();
    
    // Calcular límites para que el botón no se salga
    const maxX = windowWidth - buttonRect.width - 40;
    const maxY = windowHeight - buttonRect.height - 40;
    
    // Generar posición aleatoria
    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;
    
    // Asegurar distancia mínima de la posición actual
    const minDistance = 120;
    const currentX = buttonRect.left;
    const currentY = buttonRect.top;
    
    // Evitar que aparezca muy cerca
    let attempts = 0;
    while (Math.abs(newX - currentX) < minDistance && Math.abs(newY - currentY) < minDistance && attempts < 10) {
        newX = Math.random() * maxX;
        newY = Math.random() * maxY;
        attempts++;
    }
    
    // Aplicar nueva posición
    button.style.position = 'fixed';
    button.style.left = newX + 'px';
    button.style.top = newY + 'px';
    button.style.transition = 'all 0.3s ease-out';
    button.style.zIndex = '1000';
}

// ============================================
// MANEJO DEL BOTÓN "NO" EN QUESTION.HTML
// ============================================
const noButton = document.getElementById('noButton');

if (noButton) {
    // Mantener el texto literal "No 😢"
    noButton.textContent = 'No 😢';
    
    // Escapar al pasar el mouse por encima (desktop)
    noButton.addEventListener('mouseenter', function() {
        escapeButton(noButton);
    });
    
    // Escapar al hacer click (móvil)
    noButton.addEventListener('click', function(e) {
        e.preventDefault();
        escapeButton(noButton);
    });
    
    // Escapar al hacer touch (móvil)
    noButton.addEventListener('touchstart', function(e) {
        e.preventDefault();
        escapeButton(noButton);
    });
}

// ============================================
// AÑADIR ANIMACIÓN SHAKE AL CSS
// ============================================
if (!document.getElementById('shake-animation')) {
    const style = document.createElement('style');
    style.id = 'shake-animation';
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            25% { transform: translateX(-10px) rotate(-5deg); }
            50% { transform: translateX(10px) rotate(5deg); }
            75% { transform: translateX(-10px) rotate(-3deg); }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// EFECTOS PARA PÁGINA ACCEPTED
// ============================================
if (window.location.pathname.includes('accepted.html')) {
    // Crear confetti pixel art
    function createPixelConfetti() {
        const colors = ['#ff6b9d', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
        const confettiCount = 30;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '8px';
                confetti.style.height = '8px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.zIndex = '999';
                confetti.style.transition = 'all 3s linear';
                confetti.style.pointerEvents = 'none';
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.style.top = window.innerHeight + 'px';
                    confetti.style.transform = 'rotate(720deg)';
                    confetti.style.opacity = '0';
                }, 50);
                
                setTimeout(() => {
                    confetti.remove();
                }, 3100);
            }, i * 100);
        }
    }
    
    // Lanzar confetti al cargar
    setTimeout(createPixelConfetti, 500);
    
    // Repetir confetti cada 5 segundos
    setInterval(createPixelConfetti, 5000);
    
    // Vibración en móvil
    if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100, 50, 100]);
    }
}

// ============================================
// LLUVIA DE CORAZONES EN CASCADA - TODA LA PANTALLA
// ============================================
function createHeartRain() {
    const hearts = ['♥', '♡', '💕', '💖', '💗', '💝', '💓'];
    const heart = document.createElement('div');
    
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'fixed';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.color = 'rgba(255, 179, 217, 0.7)';
    heart.style.left = Math.random() * 100 + '%'; // Cualquier posición horizontal
    heart.style.top = '-50px'; // Empieza arriba
    heart.style.zIndex = '1';
    heart.style.pointerEvents = 'none';
    heart.style.transition = 'all ' + (Math.random() * 3 + 5) + 's linear';
    heart.style.textShadow = '0 0 10px rgba(255, 179, 217, 0.8)';
    
    document.body.appendChild(heart);
    
    // Caer de arriba hacia abajo
    setTimeout(() => {
        heart.style.top = '110vh'; // Cae hasta abajo
        heart.style.transform = 'translateX(' + (Math.random() * 50 - 25) + 'px) rotate(' + (Math.random() * 360) + 'deg)';
    }, 50);
    
    // Remover después de que cae
    setTimeout(() => {
        heart.remove();
    }, 8100);
}

// Iniciar lluvia inmediatamente - crear varios corazones al inicio
for (let i = 0; i < 15; i++) {
    setTimeout(() => {
        createHeartRain();
    }, i * 200);
}

// Continuar creando corazones constantemente (cada 400ms = lluvia abundante)
setInterval(createHeartRain, 400);

// ============================================
// EFECTO DE BRILLO EN BOTÓN YES AL HOVER
// ============================================
const yesButton = document.querySelector('.yes');

if (yesButton) {
    yesButton.addEventListener('mouseenter', function() {
        // Crear partículas de brillo
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.style.position = 'absolute';
                sparkle.style.width = '4px';
                sparkle.style.height = '4px';
                sparkle.style.backgroundColor = '#fff';
                sparkle.style.borderRadius = '50%';
                sparkle.style.left = (Math.random() * 100) + '%';
                sparkle.style.top = (Math.random() * 100) + '%';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.animation = 'sparkle 0.8s ease-out forwards';
                
                yesButton.style.position = 'relative';
                yesButton.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 800);
            }, i * 100);
        }
    });
}

// Animación de sparkle
if (!document.getElementById('sparkle-animation')) {
    const style = document.createElement('style');
    style.id = 'sparkle-animation';
    style.textContent = `
        @keyframes sparkle {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(3) translateY(-20px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// ESTELA DEL CURSOR ROSA CUTE
// ============================================
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', function(e) {
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    createCursorTrail(cursorX, cursorY);
});

function createCursorTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    
    document.body.appendChild(trail);
    
    // Remover después de la animación
    setTimeout(() => {
        trail.remove();
    }, 800);
}

// ============================================
// SONIDO RETRO AL HACER CLICK 
// ============================================

function playRetroSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Añadir sonido a los botones
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', playRetroSound);
});
