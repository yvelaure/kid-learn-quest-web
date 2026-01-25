/**
 * SOVEREIGN NEXUS: WORLD DATA
 * This file contains all the levels and activities.
 */

const GameDatabase = {
    // PRE-SCHOOL: Magic Forest Theme
    preschool: {
        id: "zone_1",
        label: "MAGIC FOREST",
        themeColor: "#22c55e",
        quests: [
            { id: "p1", title: "Alpha-Match", q: "Which letter is for APPLE?", a: "A", o: ["A", "B", "C"] },
            { id: "p2", title: "Num-Count", q: "How many stars are here: ⭐⭐?", a: "2", o: ["1", "2", "3"] },
            { id: "p3", title: "Color-Quest", q: "What color is the Sky?", a: "Blue", o: ["Blue", "Red", "Green"] }
        ]
    },

    // MIDDLE SCHOOL: Cyber City Theme
    middleSchool: {
        id: "zone_2",
        label: "CYBER CITY",
        themeColor: "#38bdf8",
        quests: [
            { id: "m1", title: "Algebra Arena", q: "Solve: 2x + 4 = 10", a: "x=3", o: ["x=2", "x=3", "x=7"] },
            { id: "m2", title: "History Vault", q: "Who discovered Gravity?", a: "Newton", o: ["Einstein", "Newton", "Tesla"] },
            { id: "m3", title: "Code Lab", q: "Which tag is for a Button?", a: "<button>", o: ["<div>", "<span>", "<button>"] }
        ]
    },

    // HIGH SCHOOL: Galactic Empire Theme
    highSchool: {
        id: "zone_3",
        label: "GALACTIC VOID",
        themeColor: "#a855f7",
        quests: [
            { id: "h1", title: "Quantum Physics", q: "E = mc²... what is 'c'?", a: "Light Speed", o: ["Gravity", "Light Speed", "Mass"] },
            { id: "h2", title: "Bio-Genetics", q: "Where is DNA stored?", a: "Nucleus", o: ["Nucleus", "Ribosome", "Cell Wall"] },
            { id: "h3", title: "Advanced Lit", q: "Who wrote 'Hamlet'?", a: "Shakespeare", o: ["Mark Twain", "Shakespeare", "Homer"] }
        ]
    }
};
