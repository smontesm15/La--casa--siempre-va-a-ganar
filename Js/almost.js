import { playSound } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
    const loopCount = parseInt(localStorage.getItem('loopCount') || '0');
    const exitBtn = document.getElementById('exit-final-btn');

    let ambient = null;
    if (loopCount >= 1) {
        document.body.classList.add('minimalist');
        document.getElementById('almost-title').textContent = "Casi.";
        ambient = playSound.startAmbient();
        window.addEventListener('beforeunload', () => ambient && ambient.stop());
    }

    exitBtn.addEventListener('click', () => {
        playSound.glitch();
        localStorage.setItem('loopCount', (loopCount + 1).toString());
        localStorage.setItem('money', '100');
        localStorage.setItem('attempts', '0');

        document.body.style.background = "white";
        setTimeout(() => {
            if (loopCount === 0) {
                window.location.href = 'lobby.html';
            } else {
                window.location.href = 'final.html';
            }
        }, 500);
    });
});

