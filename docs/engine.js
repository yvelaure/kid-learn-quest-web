/**
 * SOVEREIGN NEXUS: MASTER ENGINE
 */

// 1. INITIALIZE PLAYER DATA
let Player = JSON.parse(localStorage.getItem('sovereign_save')) || {
    name: "Hero",
    stars: 0,
    rank: "Novice",
    mode: "preschool",
    badges: []
};

// 2. THE BRIDGE (Fixes the empty bottom area)
function renderMissions() {
    const grid = document.getElementById('mission-grid');
    if (!grid) return;

    const modeData = GameDatabase[Player.mode];
    const tasks = modeData.quests;
    
    grid.innerHTML = ""; 
    
    tasks.forEach((quest, index) => {
        const tile = document.createElement('div');
        tile.className = "activity-node";
        tile.onclick = () => startBattle(index);
        
        const icons = ['🔢', '📖', '🧪', '🧬', '⚙️', '🌌', '📐', '🔋', '📡', '🛡️'];
        const icon = icons[index] || '🌟';

        tile.innerHTML = `
            <span class="node-icon">${icon}</span>
            <span class="node-label">${quest.title}</span>
        `;
        grid.appendChild(tile);
    });
}

// 3. UI UPDATER & EVOLUTION
function updateHUD() {
    const starEl = document.getElementById('stars');
    const rankEl = document.getElementById('rank-display');
    const dragonEl = document.getElementById('dragon');
    const xpFill = document.getElementById('xp-fill');

    if (starEl) starEl.innerText = Player.stars.toLocaleString();
    
    // Update Progress Bar
    if (xpFill) {
        let percent = (Player.stars / 20000) * 100;
        xpFill.style.width = Math.min(percent, 100) + "%";
    }

    // Evolution Logic
    if (Player.stars >= 10000) {
        Player.rank = "GALACTIC SOVEREIGN";
        dragonEl.innerText = "🐲";
        dragonEl.style.filter = "drop-shadow(0 0 20px #a855f7)";
    } else if (Player.stars >= 5000) {
        Player.rank = "CYBER DRAKE";
        dragonEl.innerText = "🦎"; 
        dragonEl.style.filter = "drop-shadow(0 0 15px #38bdf8)";
    } else {
        Player.rank = "FOREST HATCHLING";
        dragonEl.innerText = "🥚";
    }
    
    if (rankEl) rankEl.innerText = Player.rank;

    // Check for Mastery Certificate
    if (Player.stars >= 20000) {
        const cert = document.getElementById('cert-overlay');
        if (cert && cert.style.display === 'none') {
            cert.style.display = 'flex';
            speak("Congratulations, Galactic Sovereign! You have mastered the Nexus.");
        }
    }
}

// 4. BATTLE ENGINE & VOICE
function startBattle(questIndex) {
    const zoneData = GameDatabase[Player.mode];
    const quest = zoneData.quests[questIndex];
    
    const overlay = document.getElementById('q-modal');
    const title = document.getElementById('q-title');
    const body = document.getElementById('q-body');
    const grid = document.getElementById('opt-grid');

    overlay.style.display = 'flex';
    title.innerText = quest.title;
    body.innerText = quest.q;
    
    // Voice Narration
    speak(quest.q);

    grid.innerHTML = ""; 
    quest.o.forEach(option => {
        const btn = document.createElement('div');
        btn.className = "opt"; // Ensure this class is in your style.css
        btn.innerText = option;
        btn.onclick = () => {
            if (option === quest.a) {
                processWin(500);
            } else {
                speak("Incorrect. Try again, Hero.");
                alert("BLOCK! Try again.");
            }
        };
        grid.appendChild(btn);
    });
}

function processWin(reward) {
    Player.stars += reward;
    speak("Victory! Plus " + reward + " stars.");
    document.getElementById('q-modal').style.display = 'none';
    saveGame();
}

// 5. SYSTEMS
function saveGame() {
    localStorage.setItem('sovereign_save', JSON.stringify(Player));
    updateHUD();
}

function speak(text) {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.pitch = 1.1;
    msg.rate = 0.9;
    window.speechSynthesis.speak(msg);
}

function changeGrade(newMode) {
    Player.mode = newMode;
    saveGame();
    location.reload(); 
}

// 6. TEACHER ADMIN (Shift + A)
window.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key === 'A') {
        let code = prompt("ENTER TEACHER ACCESS CODE:");
        if (code === "1234") {
            let action = prompt("Type 'RESET' or 'GIFT':");
            if (action === "RESET") { localStorage.clear(); location.reload(); }
            if (action === "GIFT") { processWin(10000); }
        }
    }
} );

// INITIALIZE ON START
window.onload = () => {
    updateHUD();
    renderMissions();
};
