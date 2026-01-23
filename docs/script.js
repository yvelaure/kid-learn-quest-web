// 1. Initial Data
let stars = parseInt(localStorage.getItem('stars')) || 0;
document.getElementById('star-count').innerText = stars;

// 2. Speech Synthesis (The App "Talks")
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.3; 
    window.speechSynthesis.speak(utterance);
}

// 3. Handle Clicks
function handleCategory(name, welcomeMessage) {
    // Play a "pop" sound (if you have one)
    // Add a star for exploring!
    stars++;
    updateStars();
    
    // Speak the welcome message
    speak(welcomeMessage);
    
    alert("Moving to " + name + " section!");
}

function updateStars() {
    document.getElementById('star-count').innerText = stars;
    localStorage.setItem('stars', stars);
}

// 4. Parental Gate Logic
let correctAnswer;
function openParentGate() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    correctAnswer = num1 + num2;
    
    document.getElementById('math-problem').innerText = `What is ${num1} + ${num2}?`;
    document.getElementById('parent-modal').style.display = 'block';
}

function checkParentAnswer() {
    const userAnswer = document.getElementById('parent-answer').value;
    if (parseInt(userAnswer) === correctAnswer) {
        alert("Settings Unlocked!");
        closeModal();
    } else {
        speak("Nice try, kiddo! Ask a grown-up for help.");
    }
}

function closeModal() {
    document.getElementById('parent-modal').style.display = 'none';
}
