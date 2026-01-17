// Sound effects using Web Audio API
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    return audioCtx;
}

function playCorrectSound() {
    try {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.4);
    } catch (e) {
        console.log('Sound not available');
    }
}

function playWrongSound() {
    try {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(200, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.3);
    } catch (e) {
        console.log('Sound not available');
    }
}

function playLevelUpSound() {
    try {
        const ctx = getAudioContext();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        
        notes.forEach((freq, i) => {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);
            gainNode.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.15);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.3);
            
            oscillator.start(ctx.currentTime + i * 0.15);
            oscillator.stop(ctx.currentTime + i * 0.15 + 0.3);
        });
    } catch (e) {
        console.log('Sound not available');
    }
}

// Local Storage Functions
function loadStats() {
    try {
        const data = localStorage.getItem('kidLearnQuestStats');
        return data ? JSON.parse(data) : { totalStars: 0, bestLevel: 1 };
    } catch (e) {
        return { totalStars: 0, bestLevel: 1 };
    }
}

function saveStats(stats) {
    try {
        localStorage.setItem('kidLearnQuestStats', JSON.stringify(stats));
    } catch (e) {
        console.log('Could not save stats');
    }
}

function loadGameProgress(gameType) {
    try {
        const data = localStorage.getItem(`kidLearnQuest_${gameType}`);
        return data ? JSON.parse(data) : { level: 1, score: 0, stars: 0 };
    } catch (e) {
        return { level: 1, score: 0, stars: 0 };
    }
}

function saveGameProgress(gameType, progress) {
    try {
        localStorage.setItem(`kidLearnQuest_${gameType}`, JSON.stringify(progress));
        
        // Update total stats
        const stats = loadStats();
        let totalStars = 0;
        ['math', 'reading', 'science'].forEach(type => {
            const gameData = loadGameProgress(type);
            totalStars += gameData.stars || 0;
        });
        stats.totalStars = totalStars;
        if (progress.level > stats.bestLevel) {
            stats.bestLevel = progress.level;
        }
        saveStats(stats);
    } catch (e) {
        console.log('Could not save progress');
    }
}

// Utility Functions
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
