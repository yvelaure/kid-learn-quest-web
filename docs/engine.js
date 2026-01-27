function renderMissions() {
    const grid = document.getElementById('mission-grid');
    grid.innerHTML = "";
    
    // Get the current world based on level
    let level = Math.floor(Player.stars / 1000);
    
    GameDatabase.preschool.quests.forEach((q, i) => {
        const node = document.createElement('div');
        node.className = "activity-node";
        
        // Show actual letter/number or an icon
        node.innerHTML = `<span>${q.title}</span>`;
        
        // Lock higher missions if stars are too low (Professional touch)
        if (i > (level + 2)) {
            node.style.opacity = "0.5";
            node.innerHTML = "🔒";
        } else {
            node.onclick = () => startBattle(i);
        }
        
        grid.appendChild(node);
    });
}
