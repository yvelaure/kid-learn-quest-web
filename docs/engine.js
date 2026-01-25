/**
 * SOVEREIGN NEXUS: GAME ENGINE
 * This file runs the logic, battles, and saving.
 */

// 1. INITIALIZE PLAYER DATA (Load from memory or start new)
let Player = JSON.parse(localStorage.getItem('sovereign_save')) || {
    name: "Hero",
    stars: 500,
    rank: "Novice",
    mode: "preschool", // Default starting point
    completedQuests: []
};

// 2. SAVE SYSTEM
function saveGame() {
    localStorage.setItem('sovereign_save', JSON.stringify(Player));
    updateHUD();
}

// 3. UI UPDATER (Syncs HTML with Javascript)
function updateHUD() {
    const starEl = document.getElementById('stars');
    if (starEl) starEl.innerText = Player.stars.toLocaleString();
    
    // Update Dragon Stage
    const dragon = document.getElementById('dragon');
    if (Player.stars > 5000) dragon.innerText = "🐲";
    else if (Player.stars > 1000) dragon.innerText = "🐣";
}

// 4. BATTLE ENGINE
function startBattle(questIndex) {
    const zoneData = GameDatabase[Player.mode];
    const quest = zoneData.quests[questIndex];
    
    // Get the Battle Overlay (From index.html)
    const overlay = document.getElementById('q-modal');
    const title = document.getElementById('q-title');
    const body = document.getElementById('q-body');
    const grid = document.getElementById('opt-grid');

    overlay.style.display = 'flex';
    title.innerText = quest.title;
    body.innerText = quest.q;
    
    grid.innerHTML = ""; // Clear old buttons
    
    quest.o.forEach(option => {
        const btn = document.createElement('div');
        btn.className = "opt";
        btn.innerText = option;
        btn.onclick = () => {
            if (option === quest.a) {
                processWin(500);
            } else {
                alert("BLOCK! The monster hit back! Try again.");
            }
        };
        grid.appendChild(btn);
    });
}

// 5. REWARD SYSTEM
function processWin(reward) {
    Player.stars += reward;
    alert("VICTORY! You earned " + reward + " stars!");
    document.getElementById('q-modal').style.display = 'none';
    saveGame();
}

// 6. GRADE SWITCHER
function changeGrade(newMode) {
    Player.mode = newMode;
    alert("Entering " + GameDatabase[newMode].label);
    // Refresh the Mission Grid on the home screen
    location.reload(); 
}

// Run HUD update on start
window.onload = updateHUD;
