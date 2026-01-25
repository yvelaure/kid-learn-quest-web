// 1. INITIALIZE PLAYER
let Player = JSON.parse(localStorage.getItem('sovereign_save')) || {
    stars: 0,
    mode: "preschool",
    rank: "Novice"
};

// 2. THE BRIDGE (This makes the buttons appear at the bottom)
function renderMissions() {
    const grid = document.getElementById('mission-grid');
    if (!grid) return;

    const tasks = GameDatabase[Player.mode].quests;
    grid.innerHTML = ""; 
    
    tasks.forEach((quest, index) => {
        const tile = document.createElement('div');
        tile.className = "activity-node";
        tile.onclick = () => startBattle(index);
        
        const icons = ['🔢', '📖', '🧪', '🧬', '⚙️', '🌌', '📐', '🔋', '📡', '🛡️'];
        tile.innerHTML = `
            <span class="node-icon">${icons[index] || '🌟'}</span>
            <span class="node-label">${quest.title}</span>
        `;
        grid.appendChild(tile);
    });
}

// 3. UI UPDATER
function updateHUD() {
    document.getElementById('stars').innerText = Player.stars.toLocaleString();
    const dragon = document.getElementById('dragon');
    const rank = document.getElementById('rank-display');
    const xp = document.getElementById('xp-fill');

    // Progress Bar
    if(xp) xp.style.width = (Player.stars / 20000 * 100) + "%";

    // Evolution
    if (Player.stars >= 10000) {
        dragon.innerText = "🐲";
        rank.innerText = "GALACTIC SOVEREIGN";
    } else if (Player.stars >= 5000) {
        dragon.innerText = "🦎";
        rank.innerText = "CYBER DRAKE";
    } else {
        dragon.innerText = "🥚";
        rank.innerText = "FOREST HATCHLING";
    }
}

// 4. BATTLE ENGINE
function startBattle(idx) {
    const quest = GameDatabase[Player.mode].quests[idx];
    document.getElementById('q-modal').style.display = 'flex';
    document.getElementById('q-title').innerText = quest.title;
    document.getElementById('q-body').innerText = quest.q;
    
    // Voice Narration
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(quest.q));

    const grid = document.getElementById('opt-grid');
    grid.innerHTML = "";
    quest.o.forEach(opt => {
        const btn = document.createElement('div');
        btn.className = "opt";
        btn.innerText = opt;
        btn.onclick = () => {
            if(opt === quest.a) {
                Player.stars += 500;
                saveGame();
                document.getElementById('q-modal').style.display = 'none';
                alert("CORRECT! +500 Stars");
            } else {
                alert("SHIELD BLOCK! Try again.");
            }
        };
        grid.appendChild(btn);
    });
}

function saveGame() {
    localStorage.setItem('sovereign_save', JSON.stringify(Player));
    updateHUD();
}

function changeGrade(m) {
    Player.mode = m;
    saveGame();
    location.reload(); 
}

// THIS RUNS THE GAME
window.onload = () => {
    updateHUD();
    renderMissions();
};
