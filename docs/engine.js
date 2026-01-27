let Player = JSON.parse(localStorage.getItem('sovereign_save')) || { stars: 0, history: { wrong: [], completed: 0 } };

function renderMissions() {
    const grid = document.getElementById('mission-grid');
    // Level 1 = Jungle, Level 5 = Ocean, Level 10 = Space
    let level = Math.floor(Player.stars / 1000) + 1;
    
    // Change colors based on level
    if(level >= 10) document.body.style.background = "#2e1065";
    else if(level >= 5) document.body.style.background = "#172554";

    grid.innerHTML = GameDatabase.preschool.quests.map((q, i) => `
        <div class="node" onclick="startBattle(${i})">${q.title}</div>
    `).join('');
}

function startBattle(i) {
    const q = GameDatabase.preschool.quests[i];
    if ('speechSynthesis' in window) {
        const m = new SpeechSynthesisUtterance(q.q);
        window.speechSynthesis.speak(m);
    }
    document.getElementById('q-modal').style.display = 'flex';
    document.getElementById('q-body').innerText = q.q;
    document.getElementById('opt-grid').innerHTML = q.o.map(opt => `
        <button class="opt" onclick="checkAns('${opt}', '${q.a}')">${opt}</button>
    `).join('');
}

function checkAns(p, c) {
    if (p === c) {
        Player.stars += 100;
        saveGame();
        document.getElementById('q-modal').style.display = 'none';
    } else {
        if (navigator.vibrate) navigator.vibrate(200);
    }
}

function saveGame() {
    localStorage.setItem('sovereign_save', JSON.stringify(Player));
    document.getElementById('stars').innerText = Player.stars;
    renderMissions();
}

window.onload = () => { saveGame(); };
