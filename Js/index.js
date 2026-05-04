import { playSound } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
    const loopCount = parseInt(localStorage.getItem('loopCount') || '0');
    const enterBtn = document.getElementById('enter-btn');
    const welcomeText = document.getElementById('welcome-text');

    if (loopCount >= 1) {
        document.body.classList.add('minimalist');
        welcomeText.textContent = "Has vuelto al origen.";
        enterBtn.textContent = "VOLVER A DESAFIAR";
        const ambient = playSound.startAmbient();
        window.addEventListener('beforeunload', () => ambient.stop());
    } else {
        const ambience = playSound.casinoAmbience();
        window.addEventListener('beforeunload', () => ambience.stop());
    }

    enterBtn.addEventListener('click', async () => {
        await playSound.bet();
        if (!localStorage.getItem('money')) {
            localStorage.setItem('money', '100');
        }
        window.location.href = 'lobby.html';
    });
});
