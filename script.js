// ============================================
// PÁGINA INDEX - Presionar cualquier tecla
// ============================================
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
    document.addEventListener('keydown', function(event) {
        window.location.href = 'question.html';
    });

    // También permitir click en cualquier parte
    document.addEventListener('click', function(event) {
        window.location.href = 'question.html';
    });
}

// ============================================
// PÁGINA QUESTION - Manejo de botones
// ============================================
if (window.location.pathname.includes('question.html')) {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    
    // Botón "Sí"
    if (yesBtn) {
        yesBtn.addEventListener('click', function() {
            // Añadir efecto de explosión de corazones antes de cambiar de página
            createHeartExplosion(event.clientX, event.clientY);
            
            setTimeout(() => {
                window.location.href = 'accepted.html';
            }, 800);
        });
    }
    
    // Botón "No" - se escapa
    if (noBtn) {
        let escapeCount = 0;
        
        noBtn.addEventListener('mouseenter', function() {
            escapeButton(noBtn);
            escapeCount++;
            
            // Cambiar texto después de varios intentos
            if (escapeCount === 3) {
                noBtn.querySelector('.btn-text').textContent = 'En serio? 🥺';
            }
            if (escapeCount === 5) {
                noBtn.querySelector('.btn-text').textContent = 'Por favor di que sí 💕';
            }
            if (escapeCount === 8) {
                noBtn.querySelector('.btn-text').textContent = 'Ya di que sí! 😊';
            }
        });
        
        // En móvil, escapar al hacer click
        noBtn.addEventListener('click', function(e) {
            e.preventDefault();
            escapeButton(noBtn);
            escapeCount++;
        });
    }
}

// ============================================
// FUNCIÓN: Escapar el botón "No"
// ============================================
function escapeButton(button) {
    const container = button.closest('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    
    // Calcular límites para que el botón no se salga de la pantalla
    const maxX = window.innerWidth - buttonRect.width - 40;
    const maxY = window.innerHeight - buttonRect.height - 40;
    
    // Generar posición aleatoria
    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;
    
    // Asegurar que esté a una distancia mínima de su posición actual
    const minDistance = 150;
    const currentX = buttonRect.left;
    const currentY = buttonRect.top;
    
    while (Math.abs(newX - currentX) < minDistance && Math.abs(newY - currentY) < minDistance) {
        newX = Math.random() * maxX;
        newY = Math.random() * maxY;
    }
    
    // Aplicar nueva posición
    button.style.position = 'fixed';
    button.style.left = newX + 'px';
    button.style.top = newY + 'px';
    button.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    // Añadir animación de sacudida
    button.style.animation = 'shake 0.3s';
    setTimeout(() => {
        button.style.animation = '';
    }, 300);
}

// ============================================
// FUNCIÓN: Explosión de corazones
// ============================================
function createHeartExplosion(x, y) {
    const hearts = ['💖', '💕', '💗', '💓', '💝'];
    const explosionCount = 15;
    
    for (let i = 0; i < explosionCount; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.transition = 'all 1s ease-out';
        
        document.body.appendChild(heart);
        
        // Animar hacia afuera
        setTimeout(() => {
            const angle = (Math.PI * 2 * i) / explosionCount;
            const distance = 100 + Math.random() * 100;
            const newX = x + Math.cos(angle) * distance;
            const newY = y + Math.sin(angle) * distance;
            
            heart.style.left = newX + 'px';
            heart.style.top = newY + 'px';
            heart.style.opacity = '0';
            heart.style.transform = 'scale(2) rotate(360deg)';
        }, 50);
        
        // Remover después de la animación
        setTimeout(() => {
            heart.remove();
        }, 1100);
    }
}

// ============================================
// ANIMACIÓN: Shake para botón "No"
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px) rotate(-5deg); }
        75% { transform: translateX(10px) rotate(5deg); }
    }
`;
document.head.appendChild(style);

// ============================================
// PÁGINA ACCEPTED - Efectos especiales
// ============================================
if (window.location.pathname.includes('accepted.html')) {
    // Reproducir sonido de celebración (opcional)
    // const audio = new Audio('celebration.mp3');
    // audio.play();
    
    // Vibración en móvil (si está disponible)
    if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100, 50, 100]);
    }
    
    // Crear más corazones flotantes después de un momento
    setTimeout(() => {
        createFloatingHearts();
    }, 1000);
}

// ============================================
// FUNCIÓN: Crear corazones flotantes adicionales
// ============================================
function createFloatingHearts() {
    const hearts = ['💖', '💕', '💗', '💓', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.bottom = '-50px';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        heart.style.opacity = '0.8';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1';
        heart.style.transition = 'all 4s linear';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.style.bottom = '110%';
            heart.style.opacity = '0';
            heart.style.transform = 'translateX(' + (Math.random() * 100 - 50) + 'px) rotate(360deg)';
        }, 50);
        
        setTimeout(() => {
            heart.remove();
        }, 4100);
    }, 500);
}

// ============================================
// CURSOR PERSONALIZADO (Efecto de corazones)
// ============================================
let lastX = 0;
let lastY = 0;
let cursorHeartTimeout;

document.addEventListener('mousemove', function(e) {
    const distanceMoved = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));
    
    // Solo crear corazones si el cursor se movió lo suficiente
    if (distanceMoved > 50) {
        clearTimeout(cursorHeartTimeout);
        cursorHeartTimeout = setTimeout(() => {
            createCursorHeart(e.clientX, e.clientY);
        }, 100);
        
        lastX = e.clientX;
        lastY = e.clientY;
    }
});

function createCursorHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '💕';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '12px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1';
    heart.style.opacity = '0.6';
    heart.style.transition = 'all 1s ease-out';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.style.top = (y - 30) + 'px';
        heart.style.opacity = '0';
        heart.style.transform = 'scale(0.5)';
    }, 50);
    
    setTimeout(() => {
        heart.remove();
    }, 1100);
}

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
    }
});
