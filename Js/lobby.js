import { playSound } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
    const loopCount = parseInt(localStorage.getItem('loopCount') || '0');
    const money = parseInt(localStorage.getItem('money') || '100');
    const moneyAmount = document.getElementById('money-amount');
    const playBtn = document.getElementById('play-btn');
    const exitBtn = document.getElementById('exit-btn');
    const lobbyTitle = document.getElementById('lobby-title');
    const lobbyMsg = document.getElementById('lobby-msg');
    const exitModal = document.getElementById('exit-modal');
    const modalClose = document.getElementById('modal-close');

    moneyAmount.textContent = `$${money.toFixed(2)}`;

    if (loopCount >= 1) {
        document.body.classList.add('minimalist');
        lobbyTitle.textContent = "Sigues aquí.";
        lobbyMsg.textContent = "No hay escapatoria.";
        exitBtn.style.opacity = "0.2";
        exitBtn.style.cursor = "not-allowed";
        // Dark introspective drone in minimalist lobby
        const ambient = playSound.startAmbient();
        window.addEventListener('beforeunload', () => ambient.stop());
    } else {
        // Cheerful/Busy casino ambience in standard lobby
        const ambience = playSound.casinoAmbience();
        window.addEventListener('beforeunload', () => ambience.stop());
    }

    playBtn.addEventListener('click', () => {
        playSound.bet();
        window.location.href = 'game.html';
    });

    exitBtn.addEventListener('click', () => {
        if (loopCount < 1) {
            playSound.error();
            exitModal.classList.add('show');
        } else {
            playSound.glitch();
            lobbyMsg.textContent = "Ya lo intentaste.";
        }
    });

    modalClose.addEventListener('click', () => {
        exitModal.classList.remove('show');
    });
});

