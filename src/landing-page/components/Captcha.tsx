import { useState, useEffect } from 'react';

// @ts-ignore
export default function Captcha({ completeCaptcha }) {
    // Generate random math expression
    function generateRandomMathExpression() {
        const num1 = Math.floor(Math.random() * 900) + 100; // Random number between 100 and 999
        const num2 = Math.floor(Math.random() * 90) + 10;   // Random number between 10 and 99
        const num3 = Math.floor(Math.random() * 900) + 100; // Random number between 100 and 999
        const divisor = Math.floor(Math.random() * 9) + 2;  // Random divisor between 2 and 10

        // Create the math expression
        const expression = `(${num1} * ${num2} + ${num3}) / ${divisor}`;
        return expression;
    }

    // Function to calculate the result of the expression
    // @ts-ignore
    function getAnswer(expression) {
        try {
            // @ts-ignore
            return parseFloat(Math.round((eval(expression) + Number.EPSILON) * 1e7) / 1e7); // Evaluate and round to 7 decimal places
        } catch (error) {
            console.error("Invalid expression", error);
            return null;
        }
    }

    const [mathExpression, setMathExpression] = useState(generateRandomMathExpression());
    const [userInput, setUserInput] = useState('');
    const [timer, setTimer] = useState(25); // 25 second timer for the "test"

    // Countdown timer
    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
        }, 1000);
        return () => clearInterval(countdown);
    }, []);

    // Trigger an alert and reset when the timer reaches 0
    useEffect(() => {
        if (timer === 0) {
            alert("Too slow! Please try again.");
            setMathExpression(generateRandomMathExpression()); // Reset the math expression
            setTimer(25); // Reset the timer for the new problem
            setUserInput(''); // Clear the input field
        }
    }, [timer]);

    // Normalize the user's input (replace commas with periods)
    // @ts-ignore
    const normalizeInput = (input) => {
        return input.replace(',', '.'); // Replace any commas with periods
    };

    // Function to handle submit (comparison between user answer and correct answer)
    const handleSubmit = () => {
        const normalizedInput = normalizeInput(userInput); // Normalize input
        const correctAnswer = getAnswer(mathExpression);
        
        // @ts-ignore
        if (parseFloat(normalizedInput) === Math.round((correctAnswer + Number.EPSILON) * 1e7) / 1e7) {
            completeCaptcha(); // Call the parent function to complete the captcha
        } else {
            alert(`Incorrect answer! Please try again.`);

            setTimer(25); // Reset the timer
            setMathExpression(generateRandomMathExpression()); // Generate a new math expression
            setUserInput(''); // Clear the input field
        }
    };

    // @ts-ignore
    const handleKeyPress = (event) => {
        // Submit when Enter is pressed
        if (event.keyCode === 13 || event.which === 13) {
            handleSubmit();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-2xl max-w-lg w-full p-8 animate-fade-in">
                <div className="flex justify-between items-center border-b border-gray-300 dark:border-neutral-700 pb-4 mb-6">
                    <div>
                        <h3 className="font-bold text-gray-800 dark:text-white text-xl md:text-2xl">
                            Prove You're Not a Human! ⏳
                        </h3>
                    </div>
                </div>

                {/* Timer */}
                <div className="text-center text-red-500 font-bold text-lg mb-6">
                    Time Remaining: <span>{timer}s</span>
                </div>

                {/* Math Expression */}
                <div className="text-center text-2xl text-gray-700 dark:text-gray-400 mb-6">
                    <p className="font-semibold">{mathExpression}</p>
                </div>

                {/* Input field */}
                <div className="mb-6">
                    <label htmlFor="mathInput" className="block text-sm font-medium mb-2 dark:text-white">
                        Please round your answer correct to the nearest 7 decimal places.
                    </label>
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="py-3 px-4 block w-full border border-gray-300 dark:border-neutral-600 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-800 dark:text-neutral-300"
                        placeholder="Enter your answer here"
                        name="mathInput"
                        onKeyUp={handleKeyPress}
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="py-2 px-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold shadow-md hover:from-red-600 hover:to-red-700 transition-colors duration-200 w-full"
                        disabled={timer === 0} // Disable the button if time runs out
                    >
                        Submit
                    </button>
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
                    animation: moveUp 5s ease-in-out;
                }
            `}</style>
        </div>
    );
}
