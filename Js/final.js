import { playSound } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
    const vuelvesTrigger = document.getElementById('vuelves-trigger');
    const ambient = playSound.startAmbient();

    vuelvesTrigger.addEventListener('click', () => {
        ambient.stop();
        playSound.glitch();
        document.body.style.background = "#ff0000";
        setTimeout(() => {
            document.body.style.background = "#fff";
            setTimeout(() => {
                localStorage.clear();
                window.location.href = 'index.html';
            }, 300);
        }, 100);
    });
});
