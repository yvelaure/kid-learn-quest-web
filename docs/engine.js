u/**
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
}


// 2. SAVE SYSTEM
function saveGame() {
    localStorage.setItem('sovereign_save', JSON.stringify(Player));
    updateHUD();
}
// VOICE NARRATION ENGINE
function speak(text) {
    // Cancel any current speech so it doesn't overlap
    window.speechSynthesis.cancel();
    
    const msg = new SpeechSynthesisUtterance(text);
    msg.pitch = 1.2; // Slightly higher pitch for a friendly "game" feel
    msg.rate = 0.9;  // Slightly slower so kids can follow along
    
    window.speechSynthesis.speak(msg);
}

// Update your startBattle function in engine.js to call this:
// Inside startBattle(idx):
// speak(quest.q); 

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
// ADD THIS TO YOUR engine.js
function checkEvolution() {
    const rankEl = document.getElementById('rank-display');
    const dragonEl = document.getElementById('dragon');

    if (Player.stars >= 10000) {
        Player.rank = "GALACTIC SOVEREIGN";
        dragonEl.innerText = "🐲"; // Add armor/crown emoji here
        dragonEl.style.filter = "drop-shadow(0 0 20px #a855f7)";
    } else if (Player.stars >= 5000) {
        Player.rank = "CYBER DRAKE";
        dragonEl.innerText = "🦎"; 
        dragonEl.style.filter = "drop-shadow(0 0 15px #38bdf8)";
    } else {
        Player.rank = "FOREST HATCHLING";
        dragonEl.innerText = "🥚";
    }
    
    if(rankEl) rankEl.innerText = Player.rank;
}
// Trigger the Certificate
if (Player.stars >= 20000) {
    document.getElementById('cert-overlay').style.display = 'flex';
    speak("Congratulations, Galactic Sovereign! You have mastered the Nexus.");
}

// Call checkEvolution() inside your processWin() function!

// TEACHER ADMIN COMMAND
window.addEventListener('keydown', (e) => {
    // Press 'Shift + A' to open the Admin Panel
    if (e.shiftKey && e.key === 'A') {
        let code = prompt("ENTER TEACHER ACCESS CODE:");
        if (code === "1234") { // You can change this code
            let action = prompt("Type 'RESET' to wipe data or 'GIFT' for 10,000 stars:");
            if (action === "RESET") {
                localStorage.clear();
                location.reload();
            } else if (action === "GIFT") {
                Player.stars += 10000;
                localStorage.setItem('sovereign_save', JSON.stringify(Player));
                updateHUD();
                alert("Stars injected into system!");
            }
        }
    }
});

