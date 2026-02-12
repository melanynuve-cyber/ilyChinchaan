// ============================================
// 1. MÚSICA DE FONDO (CON FADE-IN)
// ============================================
document.addEventListener("DOMContentLoaded", function () {
    const music = document.getElementById("bgMusic");
    if (!music) return;

    music.volume = 0;

    function startMusic() {
        if (!music.dataset.started) {
            music.play().then(() => {
                music.dataset.started = "true";
                // Efecto Fade-in suave
                let fadeIn = setInterval(() => {
                    if (music.volume < 0.25) {
                        music.volume = Math.min(0.25, music.volume + 0.01);
                    } else {
                        clearInterval(fadeIn);
                    }
                }, 100);
            }).catch(() => {});
            
            document.removeEventListener("click", startMusic);
            document.removeEventListener("keydown", startMusic);
            document.removeEventListener("touchstart", startMusic);
        }
    }

    document.addEventListener("click", startMusic);
    document.addEventListener("keydown", startMusic);
    document.addEventListener("touchstart", startMusic);
});

// ============================================
// 2. LÓGICA DEL BOTÓN "NO" (ESCAPAR)
// ============================================
function initNoButton() {
    const noButton = document.getElementById('noButton');
    if (!noButton) return;

    // Función para mover el botón
    const moveBtn = (e) => {
        e.preventDefault(); // Evitar comportamientos raros

        // 1. EL "TRASPLANTE": Si el botón sigue en la caja, lo pasamos al body
        // Esto rompe la relación con la caja morada y permite que position:fixed funcione real
        if (noButton.parentElement !== document.body) {
            document.body.appendChild(noButton);
        }

        // 2. Medidas de la pantalla
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        
        // 3. Medidas del botón
        const btnW = noButton.offsetWidth;
        const btnH = noButton.offsetHeight;

        // 4. Margen de seguridad (para que no toque los bordes)
        const margin = 30;

        // 5. Área permitida
        const maxLeft = vw - btnW - margin;
        const maxTop = vh - btnH - margin;

        // 6. Generar coordenadas
        let newLeft = Math.random() * maxLeft;
        let newTop = Math.random() * maxTop;

        // 7. Asegurar que estén dentro del margen (Clamp)
        newLeft = Math.max(margin, Math.min(newLeft, maxLeft));
        newTop = Math.max(margin, Math.min(newTop, maxTop));

        // 8. APLICAR MOVIMIENTO
        noButton.style.position = 'fixed'; // Obligatorio
        noButton.style.left = newLeft + 'px';
        noButton.style.top = newTop + 'px';
        noButton.style.zIndex = '99999'; // Encima de todo
        noButton.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
    };

    // AGREGAMOS LOS EVENTOS (CLICK Y TOUCH)
    noButton.addEventListener('click', moveBtn);
    noButton.addEventListener('touchstart', moveBtn);
}

// ============================================
// 3. EFECTOS VISUALES (LLUVIA Y ESTELA)
// ============================================

// Lluvia de corazones
function createHeartRain() {
    const hearts = ['♥', '♡', '💕', '💖', '💗', '💝', '💓'];
    const heart = document.createElement('div');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'fixed';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.color = 'rgba(255, 179, 217, 0.7)';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '-50px';
    heart.style.zIndex = '1';
    heart.style.pointerEvents = 'none';
    heart.style.transition = 'all ' + (Math.random() * 3 + 5) + 's linear';
    
    document.body.appendChild(heart);
    setTimeout(() => {
        heart.style.top = '110vh';
        heart.style.transform = `translateX(${Math.random() * 50 - 25}px) rotate(${Math.random() * 360}deg)`;
    }, 50);
    setTimeout(() => heart.remove(), 8100);
}
setInterval(createHeartRain, 400);

// Estela del cursor
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);
    setTimeout(() => {
        trail.style.transform = 'scale(0)';
        trail.style.opacity = '0';
        setTimeout(() => trail.remove(), 800);
    }, 50);
});

// ============================================
// 4. CONFETI Y BRILLOS (PARA EL "SÍ")
// ============================================

function createPixelConfetti() {
    const colors = ['#ff6b9d', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `position:fixed; width:8px; height:8px; z-index:999; pointer-events:none; transition:all 3s linear;`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            document.body.appendChild(confetti);
            setTimeout(() => {
                confetti.style.top = window.innerHeight + 'px';
                confetti.style.transform = 'rotate(720deg)';
                confetti.style.opacity = '0';
            }, 50);
            setTimeout(() => confetti.remove(), 3100);
        }, i * 100);
    }
}

// Brillo en botón YES
const yesButton = document.querySelector('.yes');
if (yesButton) {
    yesButton.addEventListener('mouseenter', () => {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `position:absolute; width:4px; height:4px; background:#fff; border-radius:50%; pointer-events:none; animation:sparkle 0.8s ease-out forwards;`;
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            yesButton.style.position = 'relative';
            yesButton.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 800);
        }
    });
}

// ============================================
// 5. NAVEGACIÓN ENTRE PANTALLAS
// ============================================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    
    const nextScreen = document.getElementById(screenId);
    if (nextScreen) {
        nextScreen.classList.add('active');
    }

    if (screenId === 'screen3') {
        createPixelConfetti();
        // Repetir confeti cada 5 segundos en la pantalla final
        setInterval(createPixelConfetti, 5000);
    }
}

// Iniciar desde Pantalla 1
document.addEventListener('keydown', () => {
    const s1 = document.getElementById('screen1');
    if (s1 && s1.classList.contains('active')) {
        showScreen('screen2');
    }
});

document.getElementById('screen1').addEventListener('click', () => {
    showScreen('screen2');
});