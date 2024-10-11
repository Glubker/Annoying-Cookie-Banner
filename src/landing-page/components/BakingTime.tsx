import { useState, useEffect } from 'react';

export default function BakingTime({ completeCaptcha }) {
    const [timeLeft, setTimeLeft] = useState(30);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [step, setStep] = useState(0); // 0 = Loading, 1 = Fake Recipe, 2 = Crispy/Chewy, 3 = Baking Timer, 4 = Final Message
    const [messages, setMessages] = useState('');

    // Loading bar progress and quirky messages
    useEffect(() => {
        if (step === 0) {
            const loadingMessages = [
                "Whisking together a perfect blend of pixels...",
                "Preheating the internet oven to 350°F...",
                "Sprinkling digital sprinkles on your cookie...",
                "Mixing in a byte of sugar and a dash of data...",
                "Rolling out the dough for the perfect browsing experience...",
                "Flattening the cookie dough just right...",
                "Tasting for perfection... almost there!",
                "Checking cookie consistency... crispy or chewy?",
            ];
            

            const interval = setInterval(() => {
                setLoadingProgress(prev => {
                    if (prev < 100) {
                        setMessages(loadingMessages[Math.floor(prev / 12.5)] || 'Finalizing your recipe...');
                        return prev + 12.5;
                    } else {
                        clearInterval(interval);
                        setStep(1); // Move to next step
                        return prev;
                    }
                });
            }, 3000); // Increase every 3 seconds
            return () => clearInterval(interval);
        }
    }, [step]);

    // Countdown for the baking timer
    useEffect(() => {
        if (step === 3 && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (step === 3 && timeLeft === 0) {
            setStep(4); // Final message after countdown
        }
    }, [timeLeft, step]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-fade-in relative">
                <div className="baking-background"></div> {/* Add some background animations */}
                
                {/* Loading Analysis Step */}
                {step === 0 && (
                    <div className="text-center mb-6">
                        <h3 className="font-bold text-gray-900 dark:text-white text-3xl animate-slide-up">
                            Analyzing your cookie preferences... 🍪
                        </h3>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 animate-fade-text">{messages}</p>
                        <div className="relative mt-6">
                            <div className="progress-container h-4 bg-gray-300 dark:bg-neutral-600 rounded-full">
                                <div
                                    style={{ width: `${loadingProgress}%` }}
                                    className="progress-bar bg-gradient-to-r from-blue-500 to-blue-600 rounded-full h-full shadow-sm"
                                ></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Fake Recipe Result Step */}
                {step === 1 && (
                    <div className="text-center mb-6 animate-fade-in">
                        <h3 className="font-bold text-gray-900 dark:text-white text-3xl">
                            Great... We got the perfect recipe for you:
                        </h3>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                            <strong>Invisi-Chip Sprinkled Surprise cookies!</strong><br />
                            Enjoy this flavor… which doesn’t actually exist. 😅
                        </p>
                        <button
                            onClick={() => setStep(2)}
                            className="py-2 px-4 mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg transition-transform transform hover:scale-105"
                        >
                            Continue
                        </button>
                    </div>
                )}

                {/* Crispy or Chewy Step */}
                {step === 2 && (
                    <div className="text-center mb-6 animate-fade-in">
                        <h3 className="font-bold text-gray-900 dark:text-white text-3xl">
                            Oh wait… do you prefer Crispy or Chewy cookies? 🍪
                        </h3>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                            This is very important for your browsing experience!
                        </p>
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={() => setStep(3)}
                                className="py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg transition-transform transform hover:scale-105"
                            >
                                Cripsy
                            </button>
                            <button
                                onClick={() => setStep(3)}
                                className="py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg transition-transform transform hover:scale-105"
                            >
                                Chewy
                            </button>
                        </div>
                    </div>
                )}

                {/* Baking Timer Step */}
                {step === 3 && (
                    <div className="text-center mb-6 animate-fade-in">
                        <h3 className="font-bold text-gray-900 dark:text-white text-3xl">
                            Please wait 30 seconds for your cookies to finish baking...
                        </h3>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 animate-fade-text">
                            {timeLeft} seconds remaining...
                        </p>
                    </div>
                )}

                {/* Final Message Step */}
                {step === 4 && (
                    <div className="text-center mb-6 animate-final-reveal">
                        <h3 className="font-bold text-gray-900 dark:text-white text-3xl">
                            Your internet cookies are ready! 🍪
                        </h3>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                            Time to enjoy the perfect browsing experience… made just for you.
                        </p>
                        <button
                            onClick={completeCaptcha}
                            className="py-2 px-4 mt-6 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg transition-transform transform hover:scale-105"
                        >
                            Start Browsing
                        </button>
                    </div>
                )}
            </div>

            {/* Animations and Styles */}
            <style jsx>{`
                .progress-container {
                    animation: progress-bar-animation 15s ease-in-out;
                }

                .progress-bar {
                    transition: width 1s ease-in-out;
                }

                .baking-background {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background-image: url('/images/baking-background.svg'); /* Add playful baking image */
                    background-size: cover;
                    opacity: 0.1;
                    z-index: -1;
                }

                .animate-fade-in {
                    animation: fadeIn 0.7s ease-in-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .animate-slide-up {
                    animation: slideUp 0.5s ease-in-out;
                }

                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .animate-fade-text {
                    animation: fadeText 1.5s ease-in-out;
                }

                @keyframes fadeText {
                    0%, 50% { opacity: 0; }
                    100% { opacity: 1; }
                }

                .animate-final-reveal {
                    animation: finalReveal 1.5s ease-in-out;
                }

                @keyframes finalReveal {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }

                button {
                    transition: transform 0.3s ease-in-out;
                }

                button:hover {
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
}
