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
const whatsappFields = document.getElementById('whatsappFields');
const confirmationMessage = document.getElementById('confirmationMessage');

// Show/hide WhatsApp fields based on RSVP selection
document.querySelectorAll('input[name="rsvp"]').forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.value === 'yes') {
            whatsappFields.classList.remove('hidden');
        } else {
            whatsappFields.classList.add('hidden');
        }
    });
});

// Form submission
rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate WhatsApp number if attending
    if (document.querySelector('input[name="rsvp"]:checked')?.value === 'yes') {
        const whatsappNumber = document.getElementById('whatsappNumber').value;
        if (!whatsappNumber) {
            alert('Por favor, ingresa tu número de WhatsApp para confirmar tu asistencia');
            return;
        }
        
        // Open WhatsApp with pre-filled message
        const message = document.getElementById('whatsappMessage').value || 'Confirmo mi asistencia a la boda de David y Nayely';
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappURL, '_blank');
    }
    
    // Show confirmation message
    rsvpForm.classList.add('hidden');
    confirmationMessage.classList.remove('hidden');
    
    // Reset form after 5 seconds
    setTimeout(() => {
        rsvpForm.reset();
        rsvpForm.classList.remove('hidden');
        confirmationMessage.classList.add('hidden');
        whatsappFields.classList.add('hidden');
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