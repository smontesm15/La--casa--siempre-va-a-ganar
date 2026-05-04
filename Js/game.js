import { playSound } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
    const loopCount = parseInt(localStorage.getItem('loopCount') || '0');
    let attempts = parseInt(localStorage.getItem('attempts') || '0');
    let money = parseInt(localStorage.getItem('money') || '100');

    const moneyAmount = document.getElementById('money-amount');
    const resultDisplay = document.getElementById('result-display');
    const betBtn = document.getElementById('bet-btn');
    const backBtn = document.getElementById('back-btn');
    const feedback = document.getElementById('game-feedback');

    if (loopCount >= 1) {
        document.body.classList.add('minimalist');
    }

    const startAmbienceOnce = () => {
        if (loopCount < 1) {
            playSound.casinoAmbience();
        }
        document.removeEventListener('click', startAmbienceOnce);
    };

    document.addEventListener('click', startAmbienceOnce);

    const updateMoney = (val) => {
        money = val;
        localStorage.setItem('money', money.toString());
        moneyAmount.textContent = `$${money.toFixed(2)}`;
        if (money >= 300) {
            setTimeout(() => {
                window.location.href = 'almost.html';
            }, 1000);
        }
    };

    updateMoney(money);

    backBtn.addEventListener('click', () => {
        playSound.bet().catch(() => {});
        window.location.href = 'lobby.html';
    });

    betBtn.addEventListener('click', async () => {
        if (money < 10) {
            playSound.error().catch(() => {});
            feedback.textContent = "Sin dinero no hay juego.";
            return;
        }

        try {
            betBtn.disabled = true;
            resultDisplay.textContent = "???";
            feedback.textContent = "";
            
            // Fire and forget sound
            playSound.bet().catch(() => {});
            
            attempts++;
            localStorage.setItem('attempts', attempts.toString());

            setTimeout(() => {
                const rand = Math.random();
                const slots = ['7', 'X', '#', '0', '!', '@'];
                const getR = () => slots[Math.floor(Math.random() * slots.length)];

                if (attempts >= 10) {
                    playSound.error().catch(() => {});
                    document.body.classList.add('debt-mode');
                    updateMoney(-999999);
                    resultDisplay.textContent = "DEUDA";
                    feedback.textContent = "HAS PERDIDO TODO.";
                    setTimeout(() => {
                        window.location.href = 'final.html';
                    }, 3000);
                    return;
                }

                if (rand < 0.6) {
                    playSound.glitch().catch(() => {});
                    updateMoney(money - 10);
                    resultDisplay.textContent = `${getR()}${getR()}${getR()}`;
                    feedback.textContent = loopCount >= 1 ? "Otra vez." : "Sigue jugando";
                } else if (rand < 0.9) {
                    playSound.jackpot().catch(() => {});
                    updateMoney(money + 50);
                    resultDisplay.textContent = "777";
                    feedback.textContent = loopCount >= 1 ? "No es suerte." : "¡MAYOR PREMIO!";
                } else {
                    playSound.glitch().catch(() => {});
                    resultDisplay.textContent = "77X";
                    feedback.textContent = "Inténtalo otra vez";
                }
                betBtn.disabled = false;
            }, 600);
        } catch (err) {
            console.error(err);
            betBtn.disabled = false;
        }
    });
});
