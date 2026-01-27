// Add 'history' to your Player object
let Player = JSON.parse(localStorage.getItem('sovereign_save')) || {
    name: "", stars: 0, mode: "preschool", 
    history: { wrong: [], completed: 0 } 
};

function checkAns(picked, correct) {
    if(picked === correct) {
        speak("Great job! That is " + picked);
        Player.history.completed++; // Track progress
        showEmojiReward();
        buzz([50, 50, 50]);
        Player.stars += 100;
        saveGame();
        setTimeout(() => { document.getElementById('q-modal').style.display = 'none'; }, 1000);
    } else {
        // Track the struggle
        if(!Player.history.wrong.includes(correct)) {
            Player.history.wrong.push(correct);
        }
        speak("Try again!");
        buzz(200);
        saveGame();
    }
}

// Secret function to show the dashboard
function toggleDashboard() {
    const dash = document.getElementById('parent-dash');
    dash.style.display = (dash.style.display === 'block') ? 'none' : 'block';
    
    // Fill the dashboard with data
    document.getElementById('stat-stars').innerText = Player.stars;
    document.getElementById('stat-done').innerText = Player.history.completed;
    document.getElementById('stat-needs-help').innerText = 
        Player.history.wrong.length > 0 ? Player.history.wrong.join(", ") : "None yet!";
}
