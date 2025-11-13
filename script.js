// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('December 28, 2025 16:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance < 0) {
        document.getElementById('days').innerHTML = '00';
        document.getElementById('hours').innerHTML = '00';
        document.getElementById('minutes').innerHTML = '00';
        document.getElementById('seconds').innerHTML = '00';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
    document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Music Player
const playButton = document.getElementById('playButton');
const weddingMusic = document.getElementById('weddingMusic');
let isPlaying = false;

// Floating Music Button
const floatingMusicBtn = document.getElementById('floatingMusicBtn');
const floatingPlayButton = floatingMusicBtn.querySelector('.play-btn i');

// Common play/pause functionality
function togglePlay() {
    if (isPlaying) {
        weddingMusic.pause();
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        floatingPlayButton.className = 'fas fa-music';
        isPlaying = false;
    } else {
        // Intentar reproducir la música
        weddingMusic.play().catch(error => {
            console.error("Error al reproducir la música:", error);
            alert("No se puede reproducir la música automáticamente. Por favor, haz clic en el botón nuevamente.");
        });
        
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
        floatingPlayButton.className = 'fas fa-pause';
        isPlaying = true;
    }
}

// Handle play/pause for both buttons
playButton.addEventListener('click', togglePlay);
floatingMusicBtn.addEventListener('click', togglePlay);

// Manejar eventos de reproducción
weddingMusic.addEventListener('ended', function() {
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    floatingPlayButton.className = 'fas fa-music';
    isPlaying = false;
});

// RSVP form functionality
const rsvpForm = document.getElementById('rsvpForm');
const confirmationMessage = document.getElementById('confirmationMessage');

// Form submission
rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const guestName = document.getElementById('guestName').value;
    const rsvpStatus = document.querySelector('input[name="rsvp"]:checked')?.value;
    const message = document.getElementById('whatsappMessage').value || 'Confirmo mi asistencia a la boda de David y Nayely';
    
    // Validar campos obligatorios
    if (!guestName) {
        alert('Por favor, ingresa tu nombre completo');
        return;
    }
    
    if (!rsvpStatus) {
        alert('Por favor, selecciona si asistirás al evento');
        return;
    }
    
    // Preparar mensaje personalizado
    let finalMessage = `*Nombre:* ${guestName}\n*Confirmación:* ${rsvpStatus === 'yes' ? 'Sí, asistiré' : 'No podré asistir'}\n\n${message}`;
    
    // Codificar mensaje para WhatsApp
    const encodedMessage = encodeURIComponent(finalMessage);
    
    // URL de WhatsApp con el número fijo
    const whatsappURL = `https://wa.me/573203771843?text=${encodedMessage}`;
    
    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappURL, '_blank');
    
    // Mostrar mensaje de confirmación
    rsvpForm.classList.add('hidden');
    confirmationMessage.classList.remove('hidden');
    
    // Resetear formulario después de 5 segundos
    setTimeout(() => {
        rsvpForm.reset();
        rsvpForm.classList.remove('hidden');
        confirmationMessage.classList.add('hidden');
    }, 5000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});