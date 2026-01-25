const GameDatabase = {
    preschool: {
        label: "DINO VALLEY",
        quests: [
            { id: "p1", title: "Dino Colors", q: "The T-Rex is RED. Tap the RED block!", a: "🟥", o: ["🟦", "🟥", "🟩"] },
            { id: "p2", title: "Egg Count", q: "There are 2 eggs + 2 eggs. How many?", a: "4", o: ["3", "4", "5"] },
            { id: "p3", title: "Big & Small", q: "Which one is BIGGER?", a: "🐘 Elephant", o: ["🐭 Mouse", "🐘 Elephant", "🐦 Bird"] },
            { id: "p4", title: "Night Sky", q: "What do we see at night?", a: "🌙 Moon", o: ["☀️ Sun", "🌙 Moon", "🌈 Rainbow"] },
            { id: "p5", title: "Letter Match", q: "B is for...", a: "Ball", o: ["Apple", "Ball", "Dog"] },
            { id: "p6", title: "Dino Sounds", q: "A Dinosaur goes...", a: "ROAR!", o: ["Meow", "Roar!", "Quack"] },
            { id: "p7", title: "Fruit Sort", q: "Which fruit is YELLOW?", a: "🍌 Banana", o: ["🍎 Apple", "🍌 Banana", "🍇 Grapes"] },
            { id: "p8", title: "Shape Sort", q: "Tap the SQUARE", a: "⏹️", o: ["⏹️", "⏺️", "🔼"] },
            { id: "p9", title: "Weather", q: "What do you need for rain?", a: "☂️ Umbrella", o: ["🕶️ Glasses", "☂️ Umbrella", "🧤 Gloves"] },
            { id: "p10", title: "Number Fun", q: "Which number comes after 5?", a: "6", o: ["4", "6", "7"] }
        ]
    },
    middleSchool: {
        label: "NEON METROPOLIS",
        quests: [
            { id: "m1", title: "Code Logic", q: "If 'score' is 10 and you get +5, what is 'score'?", a: "15", o: ["10", "15", "50"] },
            { id: "m2", title: "Earth Science", q: "Which layer of Earth do we live on?", a: "Crust", o: ["Mantle", "Core", "Crust"] },
            { id: "m3", title: "Math Master", q: "Solve: (10 * 2) - 5", a: "15", o: ["15", "20", "25"] },
            { id: "m4", title: "Ocean Deep", q: "The largest ocean on Earth?", a: "Pacific", o: ["Atlantic", "Indian", "Pacific"] },
            { id: "m5", title: "Space Tech", q: "What planet is known as the 'Red Planet'?", a: "Mars", o: ["Mars", "Venus", "Saturn"] },
            { id: "m6", title: "Grammar Bot", q: "Find the VERB: 'The robot ran fast.'", a: "Ran", o: ["Robot", "Ran", "Fast"] },
            { id: "m7", title: "Voltage", q: "What flows through a copper wire?", a: "Electricity", o: ["Water", "Air", "Electricity"] },
            { id: "m8", title: "History", q: "Who built the Great Pyramids?", a: "Egyptians", o: ["Romans", "Egyptians", "Greeks"] },
            { id: "m9", title: "Fractions", q: "What is 1/2 of 100?", a: "50", o: ["25", "50", "75"] },
            { id: "m10", title: "Biology", q: "Which organ pumps blood?", a: "Heart", o: ["Lungs", "Brain", "Heart"] }
        ]
    },
    highSchool: {
        label: "QUANTUM REALM",
        quests: [
            { id: "h1", title: "Quantum Physics", q: "What is the speed of light (c)?", a: "300,000 km/s", o: ["100,000 km/s", "300,000 km/s", "500,000 km/s"] },
            { id: "h2", title: "Chemistry", q: "What is the atomic symbol for Gold?", a: "Au", o: ["Ag", "Au", "Fe"] },
            { id: "h3", title: "Advanced Algebra", q: "Find x: x^2 = 64", a: "8", o: ["6", "8", "12"] },
            { id: "h4", title: "Philosophy", q: "Who wrote 'The Republic'?", a: "Plato", o: ["Socrates", "Plato", "Aristotle"] },
            { id: "h5", title: "Genetics", q: "What are the four DNA bases?", a: "A, T, C, G", o: ["A, B, C, D", "A, T, C, G", "X, Y, Z, W"] },
            { id: "h6", title: "Economics", q: "What happens when Supply is low but Demand is high?", a: "Price Rises", o: ["Price Drops", "Price Rises", "No Change"] },
            { id: "h7", title: "Astronomy", q: "What is at the center of the Milky Way?", a: "Black Hole", o: ["Sun", "Black Hole", "Nebula"] },
            { id: "h8", title: "Politics", q: "What is the 'Supreme Law of the Land' in the USA?", a: "Constitution", o: ["Bill of Rights", "Constitution", "Declaration"] },
            { id: "h9", title: "Literature", q: "Who wrote 'Romeo and Juliet'?", a: "Shakespeare", o: ["Dickens", "Shakespeare", "Twain"] },
            { id: "h10", title: "Final Proof", q: "If a=b and b=c, then a=c. This is called:", a: "Transitive Property", o: ["Identity", "Transitive", "Reflexive"] }
        ]
    }
};
