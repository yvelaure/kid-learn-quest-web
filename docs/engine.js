let Player = JSON.parse(localStorage.getItem('sovereign_save')) || {
    name: "", age: "", stars: 0, mode: "preschool"
};

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    if (type === 'win') {
        osc.frequency.setValueAtTime(523, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1046, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        osc.start(); osc.stop(audioCtx.currentTime + 0.3);
    } else {
        osc.frequency.setValueAtTime(110, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        osc.start(); osc.stop(audioCtx.currentTime + 0.2);
    }
}

function buzz(ms) { if (navigator.vibrate) navigator.vibrate(ms); }

function checkProfile() {
    if (!Player.name) {
        Player.name = prompt("Hero Name:") || "Explorer";
        Player.age = prompt("Age:") || "7";
        saveGame();
    }
    document.getElementById('player-name').innerText = Player.name.toUpperCase();
}

function toggleLeaderboard() {
    const modal = document.getElementById('board-modal');
    const isShowing = modal.style.display === 'flex';
    modal.style.display = isShowing ? 'none' : 'flex';
    if (!isShowing) {
        const list = document.getElementById('leaderboard-list');
        const scores = [
            {n: "ZANE_X", s: 25000}, {n: "LUNA_9", s: 18500}, 
            {n: Player.name.toUpperCase(), s: Player.stars},
            {n: "NOVA_BOT", s: 5000}, {n: "RECRUIT_1", s: 500}
        ].sort((a,b) => b.s - a.s);
        
        list.innerHTML = scores.map((u, i) => `
            <div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #333; color:${u.n === Player.name.toUpperCase() ? 'var(--gold)' : 'white'}">
                <span>#${i+1} ${u.n}</span><span>${u.s} ⭐</span>
            </div>
        `).join('');
    }
}

function renderMissions() {
    const grid = document.getElementById('mission-grid');
    grid.innerHTML = "";
    GameDatabase[Player.mode].quests.forEach((q, i) => {
        const div = document.createElement('div');
        div.className = "activity-node";
        div.innerHTML = `✨<br><small>${q.title}</small>`;
        div.onclick = () => { buzz(30); startBattle(i); };
        grid.appendChild(div);
    });
}

function startBattle(i) {
    const q = GameDatabase[Player.mode].quests[i];
    document.getElementById('q-modal').style.display = 'flex';
    document.getElementById('q-body').innerText = q.q;
    const optGrid = document.getElementById('opt-grid');
    optGrid.innerHTML = "";
    q.o.forEach(o => {
        const btn = document.createElement('div');
        btn.className = "opt";
        btn.innerText = o;
        btn.onclick = () => {
            if (o === q.a) {
                playSound('win'); buzz([50, 50, 50]);
                Player.stars += 500; saveGame();
                document.getElementById('q-modal').style.display = 'none';
            } else { playSound('lose'); buzz(200); }
        };
        optGrid.appendChild(btn);
    });
}

function changeGrade(m) {
    buzz(100); Player.mode = m; saveGame(); location.reload();
}

function resetGame() {
    if(confirm("New Game?")) { localStorage.clear(); location.reload(); }
}

function saveGame() {
    localStorage.setItem('sovereign_save', JSON.stringify(Player));
    updateHUD();
}

function updateHUD() {
    document.getElementById('stars').innerText = Player.stars.toLocaleString();
    const d = document.getElementById('dragon');
    if (Player.stars >= 5000) d.innerText = "🐲";
    else if (Player.stars >= 1000) d.innerText = "🦎";
}

window.onload = () => { checkProfile(); updateHUD(); renderMissions(); };
