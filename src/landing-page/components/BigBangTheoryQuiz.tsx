import { useState, useEffect } from 'react';

// Helper function to shuffle an array
// @ts-ignore
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

// @ts-ignore
export default function BigBangTheoryQuiz({ completeCaptcha }) {
    // List of trivia questions with multiple-choice answers
    const questions = [
        {
            question: "What real-life physicist makes multiple guest appearances and is a personal hero of Sheldon?",
            correctAnswer: "Stephen Hawking",
            options: ["Neil deGrasse Tyson", "Stephen Hawking", "Richard Feynman", "Carl Sagan"]
        },
        {
            question: "In 'The Bath Item Gift Hypothesis,' what does Sheldon give to Penny that overwhelms him with joy?",
            correctAnswer: "A napkin signed by Leonard Nimoy",
            options: ["A napkin signed by Leonard Nimoy", "A rare comic book", "A custom-made tiara", "A model of the Batmobile"]
        },
        {
            question: "What unusual exercise does Sheldon use to test his brain efficiency in 'The Panty Piñata Polarization'?",
            correctAnswer: "Playing 'Rock, Paper, Scissors, Lizard, Spock.'",
            options: ["Meditation", "Reciting pi to 1,000 digits", "Playing 'Rock, Paper, Scissors, Lizard, Spock.'", "Practicing chess"]
        },
        {
            question: "What song does Sheldon insist on being sung to him when he's sick?",
            correctAnswer: "'Soft Kitty'",
            options: ["'Soft Kitty'", "'Twinkle, Twinkle, Little Star'", "'Row, Row, Row Your Boat'", "'Hush, little baby'"]
        },
        {
            question: "What is the name of the online role-playing game Sheldon becomes addicted to in one episode?",
            correctAnswer: "Age of Conan",
            options: ["World of Warcraft", "League of Legends", "Age of Conan", "Runescape"]
        },
        {
            question: "What superhero-themed episode features Sheldon dressed as The Flash?",
            correctAnswer: "Season 1, Episode 15, 'The Pork Chop Indeterminacy.'",
            options: [
                "Season 1, Episode 10, 'The Loobenfeld Decay.'",
                "Season 1, Episode 15, 'The Pork Chop Indeterminacy.'",
                "Season 2, Episode 6, 'The Cooper-Nowitzki Theorem.'",
                "Season 3, Episode 14, 'The Einstein Approximation.'"
            ]
        },
        {
            question: "Which classic science-fiction series does the cast often reference, including Sheldon's use of the Vulcan salute?",
            correctAnswer: "Star Trek",
            options: ["Star Trek", "Doctor Who", "Battlestar Galactica", "Star Wars"]
        },
        {
            question: "What word does Sheldon use to mark his sarcasm, much to the annoyance of his friends?",
            correctAnswer: "Bazinga!",
            options: ["Bazinga!", "Gotcha!", "Boom!", "Wham!"]
        },
        {
            question: "What item does Howard receive from NASA that becomes a central plot point in Season 6?",
            correctAnswer: "A letter confirming his trip to the International Space Station",
            options: ["A letter confirming his trip to the International Space Station", "A moon rock", "A NASA jacket", "A model space shuttle"]
        },
        {
            question: "What does Sheldon always say three times when knocking on a door?",
            correctAnswer: "The person's name (e.g., 'Penny, Penny, Penny')",
            options: [
                "The person's name (e.g., 'Penny, Penny, Penny')",
                "Knock, knock, knock, followed by silence",
                "A secret code phrase",
                "'Bazinga!' three times"
            ]
        },
        {
            question: "Which character was originally planned to be mute, only speaking once in the entire series?",
            correctAnswer: "Raj Koothrappali",
            options: ["Raj Koothrappali", "Howard Wolowitz", "Leonard Hofstadter", "Sheldon Cooper"]
        },
        {
            question: "What was the original working title of The Big Bang Theory before it was finalized?",
            correctAnswer: "Lenny, Penny, and Kenny",
            options: ["Lenny, Penny, and Kenny", "The Nerd Herd", "Smart Guys", "Geek Squad"]
        },
        {
            question: "What method does Sheldon use to determine the most optimal time for bathroom breaks during movies?",
            correctAnswer: "'The Movie Pee Break' app",
            options: ["'The Movie Pee Break' app", "He never takes breaks", "A stopwatch", "A mathematical equation"]
        },
        {
            question: "What piece of set furniture never changes its position throughout the entire series?",
            correctAnswer: "Sheldon's spot on the couch",
            options: ["The fridge", "The TV", "The bookshelf", "Sheldon's spot on the couch"]
        },
        {
            question: "What was unique about the unaired pilot episode of The Big Bang Theory compared to the aired series?",
            correctAnswer: "The pilot included a different female lead named Katie, who was later replaced by Penny",
            options: [
                "It was filmed in black and white",
                "The pilot had no laugh track",
                "The pilot included a different female lead named Katie, who was later replaced by Penny",
                "It had no opening credits"
            ]
        }
    ];

    // State to track the current question, user’s selected option, and feedback
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState([]);

    const currentQuestion = questions[currentQuestionIndex];

    // Shuffle the answer options every time the question changes
    useEffect(() => {
        setShuffledOptions(shuffleArray([...currentQuestion.options]));
    }, [currentQuestionIndex]);

    const handleSubmit = () => {
        if (selectedOption === currentQuestion.correctAnswer) {
            setFeedback("Correct! Well done.");
            setIsSubmitted(true);
            setTimeout(() => {
                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to next question
                    setSelectedOption(''); // Reset selection
                    setIsSubmitted(false); // Reset submission status
                    setFeedback(''); // Clear feedback
                } else {
                    completeCaptcha(); // End quiz and call captcha completion
                }
            }, 1500); // Delay to show correct feedback
        } else {
            setFeedback("Oops! That's wrong. Try again.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-2xl max-w-lg w-full p-8 animate-move-up">
                <div className="flex justify-between items-center border-b border-gray-300 dark:border-neutral-700 pb-4 mb-6">
                    <h3 className="font-bold text-gray-800 dark:text-white text-xl md:text-2xl">
                        To verify your choice, we need to assess how big of a fan you are of The Big Bang Theory.
                    </h3>
                </div>

                {/* Question */}
                <p className="text-lg text-gray-800 dark:text-neutral-300 mb-4">
                    {currentQuestionIndex + 1}. {currentQuestion.question}
                </p>

                {/* Options */}
                {!isSubmitted && (
                    <div className="mb-6">
                        {shuffledOptions.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedOption(option)}
                                className={`block w-full py-2 px-4 mb-2 border rounded-lg text-left 
                                    ${selectedOption === option ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}

                {/* Feedback Message */}
                {feedback && (
                    <div className={`mb-4 text-center font-bold ${feedback.includes("Correct") ? "text-green-600" : "text-red-600"}`}>
                        {feedback}
                    </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end">
                    {!isSubmitted ? (
                        <button
                            onClick={handleSubmit}
                            className="py-2 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 transition-colors duration-200 w-full"
                            disabled={!selectedOption} // Disable if no option selected
                        >
                            Submit
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes moveUp {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .animate-move-up {
                    animation: moveUp 0.7s ease-in-out;
                }
            `}</style>
        </div>
    );
}
