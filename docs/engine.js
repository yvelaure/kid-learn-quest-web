// --- SAFE PLAYER DATA ---
let Player = JSON.parse(localStorage.getItem('sovereign_save')) || {
    name: "Hero", stars: 0, history: { wrong: [], completed: 0 }
};

// --- VOICE & SOUND ---
function speak(text) {
    if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance(text);
        msg.rate = 0.9;
        window.speechSynthesis.speak(msg);
    }
}

function buzz(ms) { if (navigator.vibrate) navigator.vibrate(ms); }

// --- GAME LOGIC ---
function renderMissions() {
    const grid = document.getElementById('mission-grid');
    if (!grid) return;
    grid.innerHTML = "";
    
    // Safety check for data
    if (!GameDatabase || !GameDatabase.preschool) {
        grid.innerHTML = "Loading Data...";
        return;
    }

    GameDatabase.preschool.quests.forEach((q, i) => {
        const div = document.createElement('div');
        div.className = "activity-node";
        div.innerHTML = `⭐<br><small>${q.title}</small>`;
        div.onclick = () => startBattle(i);
        grid.appendChild(div);
    });
}

function startBattle(i) {
    const q = GameDatabase.preschool.quests[i];
    speak(q.q);
    document.getElementById('q-modal').style.display = 'flex';
    document.getElementById('q-body').innerText = q.q;
    
    const optGrid = document.getElementById('opt-grid');
    optGrid.innerHTML = "";
    q.o.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "opt";
        btn.innerText = opt;
        btn.onclick = () => {
            if (opt === q.a) {
                speak("Great job!");
                Player.stars += 100;
                saveGame();
                document.getElementById('q-modal').style.display = 'none';
            } else {
                speak("Try again!");
                buzz(200);
            }
        };
        optGrid.appendChild(btn);
    });
}

function saveGame() {
    localStorage.setItem('sovereign_save', JSON.stringify(Player));
    updateHUD();
}

function updateHUD() {
    const starCount = document.getElementById('stars');
    if (starCount) starCount.innerText = Player.stars;
    
    const d = document.getElementById('dragon');
    if (d) {
        if (Player.stars >= 1000) d.innerText = "🦖";
        else if (Player.stars >= 500) d.innerText = "🦎";
        else d.innerText = "🥚";
    }
}

// Start everything
window.onload = () => {
    updateHUD();
    renderMissions();
};
