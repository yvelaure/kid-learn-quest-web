let Player = JSON.parse(localStorage.getItem('sovereign_save')) || {
    stars: 0, history: { wrong: [], completed: 0 }
};
let lastStars = Player.stars;

function speak(t) {
    const m = new SpeechSynthesisUtterance(t);
    m.rate = 0.9; m.pitch = 1.2;
    window.speechSynthesis.speak(m);
}

function buzz(ms) { if (navigator.vibrate) navigator.vibrate(ms); }

function renderMissions() {
    const grid = document.getElementById('mission-grid');
    grid.innerHTML = GameDatabase.preschool.quests.map((q, i) => `
        <div class="activity-node" onclick="startBattle(${i})">🦕<br><small>${q.title}</small></div>
    `).join('');
    
    document.getElementById('video-list').innerHTML = VideoLibrary.map(v => `
        <div class="activity-node" style="min-width:120px" onclick="playVideo('${v.id}')">📺<br><small>${v.title}</small></div>
    `).join('');
}

function startBattle(i) {
    const q = GameDatabase.preschool.quests[i];
    speak(q.q);
    document.getElementById('q-modal').style.display = 'flex';
    document.getElementById('q-body').innerText = q.q;
    document.getElementById('opt-grid').innerHTML = q.o.map(opt => `
        <button class="opt" onclick="checkAns('${opt}', '${q.a}')">${opt}</button>
    `).join('');
}

function checkAns(p, c) {
    if (p === c) {
        speak("Yay! " + p);
        Player.stars += 100;
        Player.history.completed++;
        saveGame();
        document.getElementById('q-modal').style.display = 'none';
    } else {
        speak("Try again!"); buzz(200);
        if(!Player.history.wrong.includes(c)) Player.history.wrong.push(c);
    }
}

function feedDino() {
    if(Player.stars >= 50) {
        Player.stars -= 50; speak("Yum Yum!");
        document.getElementById('dragon').style.transform = "scale(1.3)";
        setTimeout(()=> document.getElementById('dragon').style.transform="scale(1)", 300);
        saveGame();
    } else { speak("Earn more stars for snacks!"); }
}

function saveGame() {
    STICKER_LIST.forEach(s => {
        if (Player.stars >= s.cost && lastStars < s.cost) {
            speak("New Sticker! The " + s.name);
            buzz([100, 100, 100]);
        }
    });
    lastStars = Player.stars;
    localStorage.setItem('sovereign_save', JSON.stringify(Player));
    updateHUD(); updateStickers();
}

function updateHUD() {
    document.getElementById('stars').innerText = Player.stars;
    const d = document.getElementById('dragon');
    if (Player.stars >= 2000) d.innerText = "🐲";
    else if (Player.stars >= 1000) d.innerText = "🦖";
    else if (Player.stars >= 500) d.innerText = "🦎";
}

function updateStickers() {
    document.getElementById('sticker-display').innerHTML = STICKER_LIST.map(s => `
        <div class="sticker-item ${Player.stars >= s.cost ? 'unlocked' : 'locked'}">
            ${Player.stars >= s.cost ? s.emoji : '❓'}
        </div>
    `).join('');
}

function toggleDashboard() {
    const dash = document.getElementById('parent-dash');
    dash.style.display = dash.style.display === 'none' ? 'block' : 'none';
    document.getElementById('stat-stars').innerText = Player.stars;
    document.getElementById('stat-done').innerText = Player.history.completed;
    document.getElementById('stat-needs-help').innerText = Player.history.wrong.join(", ") || "None";
}

function playVideo(id) {
    document.getElementById('video-modal').style.display = 'flex';
    document.getElementById('player-container').innerHTML = `<iframe width="100%" height="200" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
}

function closeVideo() {
    document.getElementById('video-modal').style.display = 'none';
    document.getElementById('player-container').innerHTML = "";
    Player.stars += 500; saveGame();
}

window.onload = () => { renderMissions(); updateHUD(); updateStickers(); };
