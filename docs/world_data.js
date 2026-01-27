/**
 * DINO HUB: WORLD DATA
 * Organized by unlocking level and activity type.
 */

const GameDatabase = {
    preschool: {
        quests: [
            // --- WORLD 1: JUNGLE (Level 1+) ---
            { title: "A", q: "Find the letter A", a: "A", o: ["B", "A", "C"], world: 1 },
            { title: "B", q: "Find the letter B", a: "B", o: ["D", "B", "P"], world: 1 },
            { title: "C", q: "Find the letter C", a: "C", o: ["C", "O", "G"], world: 1 },
            { title: "1", q: "Tap the number 1", a: "1", o: ["2", "1", "3"], world: 1 },
            { title: "2", q: "How many ducks? 🦆 🦆", a: "2", o: ["1", "2", "3"], world: 1 },
            { title: "Red", q: "Which one is RED?", a: "🔴", o: ["🔵", "🔴", "🟡"], world: 1 },

            // --- WORLD 2: OCEAN (Level 5+ / 5000 Stars) ---
            { title: "D", q: "Find the letter D", a: "D", o: ["Q", "O", "D"], world: 5 },
            { title: "E", q: "Find the letter E", a: "E", o: ["F", "E", "L"], world: 5 },
            { title: "3", q: "Tap the number 3", a: "3", o: ["3", "5", "8"], world: 5 },
            { title: "Big", q: "Which one is BIG?", a: "🐘", o: ["🐭", "🐘"], world: 5 },
            { title: "Blue", q: "Find the BLUE fish", a: "🐟", o: ["🐠", "🐟", "🐡"], world: 5 },
            
            // --- WORLD 3: SPACE (Level 10+ / 10000 Stars) ---
            { title: "X", q: "Find the letter X", a: "X", o: ["X", "K", "Y"], world: 10 },
            { title: "10", q: "Tap the number 10", a: "10", o: ["1", "0", "10"], world: 10 },
            { title: "Sun", q: "Where is the SUN?", a: "☀️", o: ["🌙", "☀️", "☁️"], world: 10 },
            { title: "Math", q: "One plus One is...", a: "2", o: ["1", "2", "3"], world: 10 }
        ]
    }
};

const VideoLibrary = [
    { title: "ABC Song", id: "75p-N9YKqNo", stars: 500 },
    { title: "Counting 1-10", id: "V_7y0W3_Vfs", stars: 500 },
    { title: "Dino Dance", id: "PhM7Z_rKkXo", stars: 500 }
];

const STICKER_LIST = [
    { name: "Lion", emoji: "🦁", cost: 100 },
    { name: "Whale", emoji: "🐋", cost: 5000 },
    { name: "Rocket", emoji: "🚀", cost: 10000 }
];
