const additionalQuestions = [
    {
        type: 'pass',
        difficulty: 'medium',
        question: "Which Chiefs player set a Super Bowl record for most career receptions in Super Bowl LVIII (2024)?",
        options: ["Travis Kelce", "Tyreek Hill", "Jerry Rice"],
        answer: "Travis Kelce",
        yards: 15
    },
    {
        type: 'run',
        difficulty: 'short',
        question: "Who scored the 49ers' only touchdown in Super Bowl LVIII (2024)?",
        options: ["Christian McCaffrey", "Deebo Samuel", "Brandon Aiyuk"],
        answer: "Christian McCaffrey",
        yards: 10
    },
    {
        type: 'pass',
        difficulty: 'long',
        question: "Which Ravens player won NFL MVP for the 2023 regular season?",
        options: ["Lamar Jackson", "Patrick Mahomes", "Josh Allen"],
        answer: "Lamar Jackson",
        yards: 20
    },
    {
        type: 'pass',
        difficulty: 'medium',
        question: "Who was named Super Bowl LVIII MVP in 2024?",
        options: ["Patrick Mahomes", "Travis Kelce", "Rashee Rice"],
        answer: "Patrick Mahomes",
        yards: 15
    },
    {
        type: 'run',
        difficulty: 'medium',
        question: "Which 49ers running back led the NFL in rushing touchdowns in 2023?",
        options: ["Christian McCaffrey", "Raheem Mostert", "Kenneth Walker III"],
        answer: "Christian McCaffrey",
        yards: 12
    }
];

// Add these to your existing questions array
questions.push(...additionalQuestions);