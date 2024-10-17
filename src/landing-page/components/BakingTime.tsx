import { useState, useEffect } from 'react';
import PongGame from './PongGame';
import cookieImg from '../../assets/cookie.png'; // Adjust to your path

// @ts-ignore
export default function BakingTime({ completeCaptcha }) {
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameStartCountdown, setGameStartCountdown] = useState(5);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [step, setStep] = useState(0); // 0 = Loading, 1 = Fake Recipe, 2 = Crispy/Chewy, 3 = Baking Timer, 4 = Final Message
    const [messages, setMessages] = useState('');
    const [isPongOpen, setPongOpen] = useState(false); // Maze modal state
    const [isPongClosing, setIsPongClosing] = useState(false); // Animation state for closing the modal

    const [isCookieClicked, setIsCookieClicked] = useState(false);
    const [_, setCookiesEaten] = useState(0);

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


    useEffect(() => {
        if (step === 5 && gameStartCountdown > 0) {
            const timer = setTimeout(() => setGameStartCountdown(gameStartCountdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (step === 5 && gameStartCountdown === 0) {
            setPongOpen(true); // Open maze modal
        }
    }, [gameStartCountdown, step]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-fade-in relative">
                <div className="baking-background"></div> {/* Add some background animations */}
                
                {/* Loading Analysis Step */}
                {step === 0 && (
                    <div className="text-center mb-6">
                        <h3 className="font-bold text-gray-900 dark:text-white text-3xl animate-fade-in">
                            Great choice! Analyzing your cookie preferences... 🍪
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
                                className="py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                            >
                                Crispy
                            </button>
                            <button
                                onClick={() => setStep(3)}
                                className="py-3 px-6 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full shadow-lg hover:from-pink-600 hover:to-pink-700 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
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

                {/* Game Difficulty Step */}
                {step === 4 && (
                    <div className="text-center mb-6">
                        <h3 className="font-bold text-gray-900 dark:text-white text-3xl">
                            Your internet cookies finished baking, but they are burning hot! 🔥
                        </h3>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                            Let's play a quick game while we wait for them to cool down. Please choose a difficulty!
                        </p>
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={() => {
                                    setStep(5);
                                }}
                                className="py-3 px-6 bg-gray-100 border border-gray-400 text-black rounded-full shadow-lg hover:bg-orange-300 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                            >
                                Easy
                            </button>

                            <button
                                onClick={() => {
                                    setPongOpen(true); // Open maze modal
                                }}
                                className="py-3 px-6 bg-gray-100 border border-gray-400 text-black rounded-full shadow-lg hover:bg-orange-300 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                            >
                                Medium
                            </button>

                            <button
                                onClick={() => {
                                    setPongOpen(true); // Open maze modal
                                }}
                                className="py-3 px-6 bg-gray-100 border border-gray-400 text-black rounded-full shadow-lg hover:bg-orange-300 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                            >
                                Hard
                            </button>
                        </div>
                    </div>
                )}

                
                {/* Easy is for noobs */}
                {step === 5 && (
                    <div className="text-center mb-6 animate-final-reveal">
                        <h3 className="font-bold text-gray-900 dark:text-white text-3xl">
                            Easy is for noobs! How about... <span className='text-purple-700'>IMPOSSIBLE?</span> 😈
                        </h3>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 mb-5">
                            The game is about to start. Are you ready?
                        </p>

                        <span className='text-4xl font-bold'>{gameStartCountdown}</span>
                    </div>
                )}


                {/* Pong Game Step */}
                {isPongOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className={`bg-gray-800 rounded-2xl shadow-2xl w-[70vw] h-[70vh] relative flex flex-col justify-center items-center p-4 ${isPongClosing ? 'animate-fade-out' : 'animate-fade-in'}`}>
                            {/* Pong Game */}
                            <div className="w-full h-full flex justify-center items-center">
                                <PongGame completeCaptcha={() => {
                                    setIsPongClosing(true); // Start closing animation
                                    setStep(6); // Move to the next step
                                    setTimeout(() => {
                                        setPongOpen(false); // Close the modal after the animation completes
                                    }, 400); // Match this duration to the CSS animation
                                }}/>
                            </div>
                        </div>
                    </div>
                )}


                {step === 6 && (
                    <>
                        <div className="border-b border-gray-200 dark:border-neutral-800 pb-5">
                            <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
                                Awh, you took way too long, now they are all cold! 🍪
                            </h3>
                            <p>No worries, you can still have a few. 😉</p>
                        </div>
                        <div className="flex flex-col items-center gap-6 border-t border-gray-200 dark:border-neutral-800">
                            {/* Cookie Image */}
                            <div
                                className={`relative group transition-all transform-gpu duration-300 ease-in-out cursor-pointer ${isCookieClicked ? 'scale-95' : 'hover:scale-105'}`}
                                onClick={() => {
                                    setIsCookieClicked(true);
                                    setTimeout(() => setIsCookieClicked(false), 200); // Short animation reset

                                    setCookiesEaten(prev => {
                                        const newCount = prev + 1;
                                        if (newCount >= 3) {
                                            completeCaptcha(); // Complete captcha
                                        }
                                        return newCount;
                                    });
                                }}
                                >
                                <img
                                    src={cookieImg}
                                    className="w-60 h-60 rounded-full transition-all duration-500 group-hover:rotate-12"
                                    alt="Cookie"
                                />
                            </div>
                        </div>
                    </>
                )}


            </div>

            {/* Animations and Styles */}
            <style>{`
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
