let stars = parseInt(localStorage.getItem('stars')) || 0;
document.getElementById('star-count').innerText = stars;

// 1. NAVIGATION & SPEECH
function showView(viewId, message) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');
    
    if (message) speak(message);
    if (viewId === 'draw-view') initDrawing();
}

function speak(text) {
    window.speechSynthesis.cancel(); // Stop current speech
    const msg = new SpeechSynthesisUtterance(text);
    msg.pitch = 1.4; 
    window.speechSynthesis.speak(msg);
}

// 2. DRAWING LOGIC
let canvas, ctx, painting = false;

function initDrawing() {
    canvas = document.getElementById('paintCanvas');
    ctx = canvas.getContext('2d');
    
    // Resize canvas to match display size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";

    const start = (e) => { painting = true; draw(e); };
    const end = () => { painting = false; ctx.beginPath(); };

    canvas.onmousedown = start;
    canvas.onmouseup = end;
    canvas.onmousemove = draw;
    
    canvas.ontouchstart = (e) => { e.preventDefault(); start(e.touches[0]); };
    canvas.ontouchend = end;
    canvas.ontouchmove = (e) => { e.preventDefault(); draw(e.touches[0]); };
}

function draw(e) {
    if (!painting) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.pageX) - rect.left;
    const y = (e.clientY || e.pageY) - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    speak("All clean!");
}

function changeColor(color) {
    ctx.strokeStyle = color;
}

// 3. PARENT GATE
let answer;
function openParentGate() {
    const n1 = Math.floor(Math.random() * 10);
    const n2 = Math.floor(Math.random() * 5);
    answer = n1 + n2;
    document.getElementById('math-problem').innerText = `Parents: What is ${n1} + ${n2}?`;
    document.getElementById('parent-modal').style.display = 'block';
}

function checkParentAnswer() {
    const userAns = document.getElementById('parent-answer').value;
    if (parseInt(userAns) === answer) {
        alert("Success! Opening Parent Dashboard...");
        closeModal();
    } else {
        speak("Try again!");
    }
}

function closeModal() {
    document.getElementById('parent-modal').style.display = 'none';
}
