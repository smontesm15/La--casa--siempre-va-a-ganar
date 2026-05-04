const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const resumeAudio = async () => {
    if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
    }
};

export const playSound = {
    coin: async () => {
        await resumeAudio();
        const ctx = audioCtx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
        osc.frequency.exponentialRampToValueAtTime(1318.51, ctx.currentTime + 0.1); // E6
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    },
    bet: async () => {
        await resumeAudio();
        const ctx = audioCtx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    },
    jackpot: async () => {
        await resumeAudio();
        const ctx = audioCtx;
        const notes = [523.25, 523.25, 659.25, 783.99, 1046.50]; // C5 sequence
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
            gain.gain.setValueAtTime(0.05, ctx.currentTime + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.2);
            osc.start(ctx.currentTime + i * 0.1);
            osc.stop(ctx.currentTime + i * 0.1 + 0.2);
        });
    },
    error: async () => {
        await resumeAudio();
        const ctx = audioCtx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(55, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
    },
    glitch: async () => {
        await resumeAudio();
        const ctx = audioCtx;
        for(let i=0; i<3; i++) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'square';
            osc.frequency.setValueAtTime(Math.random() * 2000, ctx.currentTime + i*0.02);
            gain.gain.setValueAtTime(0.03, ctx.currentTime + i*0.02);
            gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + i*0.02 + 0.05);
            osc.start(ctx.currentTime + i*0.02);
            osc.stop(ctx.currentTime + i*0.02 + 0.05);
        }
    },
    startAmbient: () => {
        const ctx = audioCtx;
        // Deep introspective drone
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'sawtooth';
        osc1.frequency.value = 55; // Low A
        osc2.frequency.value = 55.5; // Slight detune for chorus

        lfo.type = 'sine';
        lfo.frequency.value = 0.5;
        lfoGain.gain.value = 20;

        filter.type = 'lowpass';
        filter.frequency.value = 200;
        filter.Q.value = 10;

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 4);
        
        lfo.start();
        osc1.start();
        osc2.start();

        return {
            stop: () => {
                gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
                setTimeout(() => {
                    osc1.stop();
                    osc2.stop();
                    lfo.stop();
                }, 2000);
            }
        };
    },
    casinoAmbience: () => {
        const ctx = audioCtx;
        const gain = ctx.createGain();
        gain.connect(ctx.destination);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 2);

        const interval = setInterval(() => {
            if (audioCtx.state === 'running' && Math.random() > 0.7) {
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.connect(g);
                g.connect(gain);
                o.type = 'sine';
                o.frequency.value = 400 + Math.random() * 1000;
                g.gain.setValueAtTime(0, ctx.currentTime);
                g.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);
                g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
                o.start();
                o.stop(ctx.currentTime + 0.5);
            }
        }, 800);

        return {
            stop: () => {
                clearInterval(interval);
                gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
            }
        };
    }
};

