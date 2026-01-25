let Player = JSON.parse(localStorage.getItem('sovereign_save')) || {
    stars: 0,
    mode: "preschool",
    rank: "Novice",
    streak: 0
};

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
        tile.innerHTML = `<span class="node-icon">${icons[index] || '🌟'}</span><span class="node-label">${quest.title}</span>`;
        grid.appendChild(tile);
    });
    checkBossAvailability();
}

function updateHUD() {
    document.getElementById('stars').innerText = Player.stars.toLocaleString();
    const dragon = document.getElementById('dragon');
    const rank = document.getElementById('rank-display');
    const xp = document.getElementById('xp-fill');
    const zoneBadge = document.getElementById('current-zone');

    if(xp) xp.style.width = Math.min((Player.stars / 20000 * 100), 100) + "%";
    
    // Evolution & Rank
    if (Player.stars >= 10000) { dragon.innerText = "🐲"; rank.innerText = "GALACTIC SOVEREIGN"; }
    else if (Player.stars >= 5000) { dragon.innerText = "🦎"; rank.innerText = "CYBER DRAKE"; }
    else { dragon.innerText = "🥚"; rank.innerText = "FOREST HATCHLING"; }

    function buyItem(name, cost) {
    if (Player.stars >= cost) {
        Player.stars -= cost;
        saveGame();
        speak("Purchased " + name + "!");
        alert("Success! You bought: " + name);
        
        // Bonus: If they buy the Evolution Stone, grow the dragon instantly
        if (name === 'Evolution Stone') {
            document.getElementById('dragon').innerText = "🐲";
            speak("Your dragon has reached its ultimate form!");
        }
    } else {
        speak("You need more stars for that.");
        alert("Not enough stars!");
    }
}

    // Zone Badge
    const labels = { preschool: "PRE-K", middleSchool: "MIDDLE", highSchool: "HIGH" };
    if(zoneBadge) zoneBadge.innerText = labels[Player.mode];
}

function speak(text) {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 0.9;
    window.speechSynthesis.speak(msg);
}

function startBattle(idx) {
    const quest = GameDatabase[Player.mode].quests[idx];
    document.getElementById('q-modal').style.display = 'flex';
    document.getElementById('q-body').innerText = quest.q;
    speak(quest.q);

    const grid = document.getElementById('opt-grid');
    grid.innerHTML = "";
    quest.o.forEach(opt => {
        const btn = document.createElement('div');
        btn.className = "opt";
        btn.innerText = opt;
        btn.onclick = () => {
            if(opt === quest.a) { 
                Player.stars += 500; 
                Player.streak++;
                if(Player.streak >= 3) speak("On Fire!");
                processWin(); 
            } else { 
                Player.streak = 0;
                speak("Try again!"); 
            }
        };
        grid.appendChild(btn);
    });
}

function processWin() {
    saveGame();
    document.getElementById('q-modal').style.display = 'none';
    if(Player.stars >= 20000) triggerVictory();
}

function triggerVictory() {
    const boom = document.createElement('div');
    boom.className = 'victory-explosion';
    document.body.appendChild(boom);
    boom.style.display = 'block';
    speak("Mission Accomplished! You are the Sovereign!");
    setTimeout(() => { document.getElementById('cert-overlay').style.display = 'flex'; }, 1000);
}

function changeGrade(m) {
    document.body.classList.add('shake');
    setTimeout(() => { 
        Player.mode = m; 
        saveGame(); 
        location.reload(); 
    }, 400);
}

function saveGame() {
    localStorage.setItem('sovereign_save', JSON.stringify(Player));
    updateHUD();
}

function prepareSnapshot() {
    document.querySelector('.cert-actions').style.visibility = 'hidden';
    speak("Take your screenshot now!");
    setTimeout(() => { document.querySelector('.cert-actions').style.visibility = 'visible'; }, 5000);
}

window.onload = () => { updateHUD(); renderMissions(); };
