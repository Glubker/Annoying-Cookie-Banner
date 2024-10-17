import { useState, useEffect, useRef } from 'react';
import cookieImg from '../../assets/cookie.png'; // Adjust to your path

// @ts-ignore
export default function CookieClicker({ completeCaptcha }) {
    const [clicks, setClicks] = useState(0);
    const [isCookieClicked, setIsCookieClicked] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [thoughtItWasEasyBanner, setThoughtItWasEasyBanner] = useState(false);

    const [position, setPosition] = useState({ top: window.innerHeight / 2 - 250, left: window.innerWidth / 2 - 255 }); // Start in center
    const [velocity, setVelocity] = useState({ x: 0, y: 0 }); // Set the initial movement speed
    const modalRef = useRef(null);

    useEffect(() => {
        // @ts-ignore
        let animationFrameId;

        const updatePosition = () => {
            setPosition((prevPosition) => {
                const modal = modalRef.current;
                // @ts-ignore
                const modalWidth = modal ? modal.offsetWidth : 300; // Default width if not rendered yet
                // @ts-ignore
                const modalHeight = modal ? modal.offsetHeight : 150; // Default height if not rendered yet

                let { top, left } = prevPosition;
                let { x, y } = velocity;

                // Check if the modal hits the edges of the window and bounce
                if (top + modalHeight >= window.innerHeight || top <= 0) {
                    y = -y; // Reverse vertical direction
                }
                if (left + modalWidth >= window.innerWidth || left <= 0) {
                    x = -x; // Reverse horizontal direction
                }

                // Update position and velocity
                setVelocity({ x, y });
                return {
                    top: top + y,
                    left: left + x,
                };
            });

            animationFrameId = requestAnimationFrame(updatePosition); // Request the next frame
        };

        animationFrameId = requestAnimationFrame(updatePosition); // Start the animation

        // @ts-ignore
        return () => cancelAnimationFrame(animationFrameId); // Clean up the animation frame on component unmount
    }, [velocity]);

    const handleCookieClick = () => {
        setClicks((prevClicks) => prevClicks + 1);
        setIsCookieClicked(true);

        setTimeout(() => setIsCookieClicked(false), 200); // Short animation reset

        if (clicks + 1 === 10) {
            setThoughtItWasEasyBanner(true);
            setVelocity({ x: 6, y: 6}); // Increase the speed of the modal when the cookie is clicked

            setTimeout(() => {
                setThoughtItWasEasyBanner(false);
            }, 7500); // Hide the banner after 7.5 seconds
        }

        if (clicks + 1 === 100) {
            setShowErrorDialog(true); // Show the fake error dialog when 100 clicks are reached
        }
    };

    // @ts-ignore
    const handleDialogAction = (action) => {
        if (action === 'refresh') {
            window.location.reload(); // Fake refresh action
        } else {
            setShowErrorDialog(false); // Close the fake error dialog
            completeCaptcha(); // Proceed after closing the dialog
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            {/* Cookie Modal */}
            <div
                className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-fade-in relative"
                style={{ position: 'absolute', top: `${position.top}px`, left: `${position.left}px` }}
                ref={modalRef} // Ref to get the size of the modal
            >
                {/* Header */}
                <div className="text-center mb-6">
                    <h3 className="font-bold text-gray-900 dark:text-white text-2xl">
                        Almost there! To confirm your selection, click the cookie 100 times!
                    </h3>
                    <p className="text-lg text-gray-500 dark:text-gray-400">
                        It's part of the process in making the perfect cookie!
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="relative mb-8">
                    <div className="overflow-hidden h-3 mb-1 text-xs flex rounded bg-gray-300 dark:bg-neutral-700">
                        <div
                            style={{ width: `${(clicks / 100) * 100}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300"
                        ></div>
                    </div>
                    <p className="text-center text-md text-gray-600 dark:text-gray-300">
                        {clicks} / 100 clicks
                    </p>
                </div>

                {/* Cookie Image */}
                <div className={`cursor-pointer flex justify-center transition-transform duration-200 ease-out transform ${isCookieClicked ? 'scale-90' : ''}`}>
                    <img
                        src={cookieImg}
                        onClick={handleCookieClick}
                        className="w-80 h-80 spin prevent-select"
                        alt="Cookie"
                    />
                </div>


                {/* Fake Error Dialog */}
                {showErrorDialog && (
                    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-70">
                        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-w-md w-full p-6 animate-fade-in">
                            <h4 className="text-red-500 font-bold text-lg mb-4">Oops! Something went wrong! 😱</h4>
                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                It looks like we encountered an issue. Do you want to refresh the page?
                            </p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => handleDialogAction('cancel')}
                                    className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDialogAction('refresh')}
                                    className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                                >
                                    Refresh
                                </button>
                            </div>
                        </div>
                    </div>
                )}



                {/* Really thought it would be this easy? Oh, no way! */}
                {thoughtItWasEasyBanner && (
                    <div 
                        className="fixed inset-0 mt-10 z-60 flex items-start justify-center pointer-events-none"
                    >
                        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-w-md w-full p-6 animate-fade-in pointer-events-auto">
                            <h3 className="text-gray-700 dark:text-gray-300 text-xl font-bold">
                                Really thought it would be this easy? Haha, no way!
                            </h3>
                        </div>
                    </div>
                )}

            </div>

            {/* Animations */}
            <style>{`
                .spin {
                    animation: rotate 10s linear infinite;
                }

                @keyframes rotate {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                .prevent-select {
                    -webkit-user-select: none; /* Safari */
                    -ms-user-select: none; /* IE 10 and IE 11 */
                    user-select: none; /* Standard syntax */
                }
            `}</style>
        </div>
    );
}
