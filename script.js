// ============================================
// 1. INICIALIZAR TODO CUANDO CARGUE LA PÁGINA
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log("El script ha cargado correctamente."); // Mensaje de control

    // --- A. LÓGICA DEL BOTÓN NO ---
    const noButton = document.getElementById('noButton');

    if (noButton) {
        // Función para mover el botón
        const moveButton = function(e) {
            // Prevenimos que el click haga cosas raras
            e.preventDefault(); 
            console.log("¡Click detectado en el botón NO!"); // Verás esto en la consola si funciona

            // 1. Dimensiones de la pantalla
            const vw = window.innerWidth;
            const vh = window.innerHeight;

            // 2. Dimensiones del botón
            const btnW = noButton.offsetWidth;
            const btnH = noButton.offsetHeight;

            // 3. Área segura (restamos el tamaño del botón y un margen de 40px)
            const maxX = vw - btnW - 40;
            const maxY = vh - btnH - 40;

            // 4. Nueva posición aleatoria
            const newX = Math.random() * maxX;
            const newY = Math.random() * maxY;

            // 5. APLICAR ESTILOS (El truco para que se mueva)
            noButton.style.position = 'fixed'; // Se fija a la pantalla
            noButton.style.left = (newX + 20) + 'px'; // +20 para separar del borde izq
            noButton.style.top = (newY + 20) + 'px';  // +20 para separar del borde sup
            noButton.style.zIndex = '10000'; // ¡ENCIMA DE TODO!
            noButton.style.transition = 'top 0.3s ease, left 0.3s ease'; // Movimiento suave
        };

        // Asignamos los eventos (Click para PC, Touch para Celular)
        noButton.addEventListener('click', moveButton);
        noButton.addEventListener('touchstart', moveButton);
        
    } else {
        console.error("¡ERROR! No encontré el botón con id='noButton'");
    }

    // --- B. MÚSICA DE FONDO ---
    const music = document.getElementById("bgMusic");
    if (music) {
        music.volume = 0; // Empieza en silencio
        const startAudio = () => {
            if (!music.dataset.started) {
                music.play().then(() => {
                    music.dataset.started = "true";
                    // Fade In suave
                    let vol = 0;
                    const fade = setInterval(() => {
                        if (vol < 0.25) { vol += 0.01; music.volume = vol; }
                        else clearInterval(fade);
                    }, 100);
                }).catch(err => console.log("Audio bloqueado por navegador", err));
                
                // Quitamos los listeners para que no se repita
                document.removeEventListener("click", startAudio);
                document.removeEventListener("touchstart", startAudio);
            }
        };
        document.body.addEventListener("click", startAudio);
        document.body.addEventListener("touchstart", startAudio);
    }

    // --- C. LÓGICA DE NAVEGACIÓN (PANTALLAS) ---
    const screen1 = document.getElementById('screen1');
    if (screen1) {
        screen1.addEventListener('click', () => {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            const s2 = document.getElementById('screen2');
            if (s2) s2.classList.add('active');
        });
    }

    // --- D. EFECTOS VISUALES (LLUVIA DE CORAZONES) ---
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerText = ['♥', '💖', '💕', '💗'][Math.floor(Math.random()*4)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '-50px';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.color = 'rgba(255, 182, 193, 0.4)';
        heart.style.pointerEvents = 'none'; // IMPORTANTE: Para que no tapen el botón
        heart.style.zIndex = '0'; // Detrás de todo
        heart.style.transition = 'top 4s linear, opacity 4s';
        
        document.body.appendChild(heart);
        setTimeout(() => { heart.style.top = '110vh'; heart.style.opacity = 0; }, 50);
        setTimeout(() => heart.remove(), 4100);
    }, 400);
});
