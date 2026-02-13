document.addEventListener('DOMContentLoaded', function() {
    console.log("Script cargado: Modo solo CLICK en NO.");

    // ==========================================
    // A. LÓGICA DEL BOTÓN "NO" (SOLO CLICK)
    // ==========================================
    const noButton = document.getElementById('noButton');

    if (noButton) {
        const moveButton = function(e) {
            // Evitamos que el botón haga su acción normal (como navegar)
            e.preventDefault();
            e.stopPropagation(); // Evita que el click pase a la pantalla de fondo
            
            console.log("¡Click en NO detectado! Moviendo...");

            // 1. Calcular límites de la pantalla
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const btnW = noButton.offsetWidth;
            const btnH = noButton.offsetHeight;

            // 2. Definir área segura (para que no se salga de la pantalla)
            const maxX = vw - btnW - 40;
            const maxY = vh - btnH - 40;

            // 3. Generar nueva posición aleatoria
            const newX = Math.max(20, Math.random() * maxX);
            const newY = Math.max(20, Math.random() * maxY);

            // 4. Aplicar movimiento
            noButton.style.position = 'fixed';  // Fijo a la pantalla para que no desaparezca
            noButton.style.left = newX + 'px';
            noButton.style.top = newY + 'px';
            noButton.style.zIndex = '9999';     // Aseguramos que quede encima de todo
            noButton.style.transition = 'top 0.3s ease, left 0.3s ease'; // Movimiento suave
        };

        // SOLO AGREGAMOS EVENTOS DE CLICK Y TOQUE
        noButton.addEventListener('click', moveButton);
        noButton.addEventListener('touchstart', moveButton); 
    }

    // ==========================================
    // B. NAVEGACIÓN (PANTALLAS)
    // ==========================================
    
    // 1. De Pantalla 1 (Inicio) a Pantalla 2 (Pregunta)
    const screen1 = document.getElementById('screen1');
    if (screen1) {
        screen1.addEventListener('click', () => {
            screen1.classList.remove('active');
            const s2 = document.getElementById('screen2');
            if (s2) s2.classList.add('active');
        });
    }

    // 2. De Pantalla 2 (Pregunta) a Pantalla 3 (Gracias) - BOTÓN SÍ
    const yesButton = document.querySelector('.yes'); // Busca el botón por su clase CSS .yes
    if (yesButton) {
        yesButton.addEventListener('click', (e) => {
            e.preventDefault();     // Evita recargas
            e.stopPropagation();    // Evita conflictos
            
            console.log("¡Dijo que SÍ!");

            // Ocultamos la pantalla 2
            const s2 = document.getElementById('screen2');
            if (s2) s2.classList.remove('active');

            // Mostramos la pantalla 3 (Asegúrate que en HTML tenga id="screen3")
            const s3 = document.getElementById('screen3');
            if (s3) s3.classList.add('active');
            
            // Opcional: Lanzar confeti extra si quieres
        });
    }

    // ==========================================
    // C. MÚSICA Y EFECTOS (FONDO)
    // ==========================================
    const music = document.getElementById("bgMusic");
    if (music) {
        music.volume = 0.5; // Volumen medio
        const startAudio = () => {
            if (!music.dataset.started) {
                music.play().catch(err => console.log("Audio requiere interacción"));
                music.dataset.started = "true";
            }
        };
        document.body.addEventListener("click", startAudio, { once: true });
        document.body.addEventListener("touchstart", startAudio, { once: true });
    }

    // LLUVIA DE CORAZONES (FONDO)
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerText = ['♥', '💖', '💕'][Math.floor(Math.random()*3)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '-50px';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.color = 'rgba(255, 192, 203, 0.5)';
        heart.style.pointerEvents = 'none'; // IMPORTANTE: No bloquean clicks
        heart.style.zIndex = '-1';          // IMPORTANTE: Detrás del texto
        heart.style.transition = 'top 5s linear, opacity 5s';
        
        document.body.appendChild(heart);
        setTimeout(() => { 
            heart.style.top = '110vh'; 
            heart.style.opacity = 0; 
        }, 50);
        setTimeout(() => heart.remove(), 5100);
    }, 400);
});