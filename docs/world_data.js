const GameDatabase = {
    preschool: {
        quests: [
            // --- WORLD 1: JUNGLE (The Basics) ---
            { title: "A", type: "letter", q: "Find the letter A", a: "A", o: ["B", "A", "C"] },
            { title: "1", type: "number", q: "Tap the number 1", a: "1", o: ["2", "1", "3"] },
            { title: "Red", type: "color", q: "Which one is RED?", a: "🔴", o: ["🔵", "🔴", "🟡"] },
            
            // --- WORLD 2: OCEAN (Shapes & Sizes) ---
            { title: "Big", type: "logic", q: "Which one is BIG?", a: "🐘", o: ["🐭", "🐘"] },
            { title: "Circle", type: "shape", q: "Find the Circle", a: "⭕", o: ["⭕", "❌", "💎"] },
            { title: "Match", type: "pattern", q: "Find the matching fish", a: "🐠", o: ["🐙", "🐠", "🦀"] },

            // --- WORLD 3: SPACE (Advanced) ---
            { title: "Phonics", type: "sound", q: "What says 'Buh'?", a: "B", o: ["D", "B", "M"] },
            { title: "Patterns", type: "logic", q: "What comes next? 🍎, 🍌, 🍎...", a: "🍌", o: ["🍎", "🍌"] }
        ]
    }
};
