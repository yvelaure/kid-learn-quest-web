/**
 * SOVEREIGN NEXUS: DINO PRE-K DATA
 * This file contains the full alphabet and number quests.
 * Designed for big buttons and Voice Guide compatibility.
 */

const GameDatabase = {
    preschool: {
        label: "DINO VALLEY",
        quests: [
            // --- THE ALPHABET (Learning Letters) ---
            { title: "Letter A", q: "Can you find the letter A?", a: "A", o: ["B", "A", "C"] },
            { title: "Letter B", q: "Find the bouncy letter B!", a: "B", o: ["B", "P", "R"] },
            { title: "Letter C", q: "Look for the letter C", a: "C", o: ["O", "G", "C"] },
            { title: "Letter D", q: "Where is the letter D?", a: "D", o: ["D", "Q", "B"] },
            { title: "Letter E", q: "Find the letter E", a: "E", o: ["F", "E", "L"] },
            { title: "Letter F", q: "Find the letter F", a: "F", o: ["E", "F", "H"] },
            { title: "Letter G", q: "Look for the letter G", a: "G", o: ["C", "G", "Q"] },
            { title: "Letter H", q: "Find the letter H", a: "H", o: ["H", "N", "M"] },

            // --- COUNTING (Numbers 1-10) ---
            { title: "Count 1", q: "Tap the number 1", a: "1", o: ["2", "1", "3"] },
            { title: "Count 2", q: "How many ducks? 🦆 🦆", a: "2", o: ["1", "2", "3"] },
            { title: "Count 3", q: "Find the number 3", a: "3", o: ["3", "5", "1"] },
            { title: "Count 4", q: "How many stars? ⭐ ⭐ ⭐ ⭐", a: "4", o: ["2", "4", "6"] },
            { title: "Count 5", q: "Find the number 5", a: "5", o: ["4", "5", "8"] },

            // --- ANIMALS & COLORS (Visual Recognition) ---
            { title: "Apple", q: "Which one is the RED apple?", a: "🍎", o: ["🍏", "🍎", "🍌"] },
            { title: "Doggy", q: "Where is the dog?", a: "🐶", o: ["🐱", "🐶", "🐹"] },
            { title: "Sun", q: "Tap the bright yellow sun!", a: "☀️", o: ["🌙", "☁️", "☀️"] },
            { title: "Dino Friend", q: "Find our Dino friend!", a: "🦖", o: ["🦁", "🐘", "🦖"] }
        ]
    }
};

/**
 * VIDEO LEARNING LIBRARY
 * These provide high star rewards (500 each) to help the egg hatch faster.
 */
const VideoLibrary = [
    { 
        title: "The ABC Song", 
        id: "75p-N9YKqNo", 
        stars: 500 
    },
    { 
        title: "Counting to 10", 
        id: "V_7y0W3_Vfs", 
        stars: 500 
    },
    { 
        title: "Dinosaur Dance", 
        id: "PhM7Z_rKkXo", 
        stars: 500 
    }
];
