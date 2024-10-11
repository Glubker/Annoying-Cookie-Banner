import { useState } from 'react';
import cookieImg from '../../assets/cookie.png'; // Adjust to your path

export default function CookieClicker({ completeCaptcha }) {
    const [clicks, setClicks] = useState(0);
    const [isCookieClicked, setIsCookieClicked] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false); // State to show fake error dialog

    // Handle Cookie Click
    const handleCookieClick = () => {
        setClicks(prevClicks => prevClicks + 1);
        setIsCookieClicked(true);

        setTimeout(() => setIsCookieClicked(false), 200); // Short animation reset

        if (clicks + 1 === 100) {
            // Show the fake error dialog when 100 clicks are reached
            setShowErrorDialog(true);
        }
    };

    // Handle the "Refresh" and "Cancel" actions in the fake error dialog
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
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-fade-in relative">
                {/* Header */}
                <div className="text-center mb-6">
                    <h3 className="font-bold text-gray-900 dark:text-white text-2xl">
                        Almost there! To confirm your selection, click the cookie 100 times!
                    </h3>
                    <p className="text-lg text-gray-500 dark:text-gray-400">It's part of the process in making the perfect cookie!</p>
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
                <div className="flex justify-center spin">
                    <img
                        src={cookieImg}
                        onClick={handleCookieClick}
                        className={`cursor-pointer w-60 h-60 transition-transform duration-200 ease-out transform ${
                            isCookieClicked ? 'scale-110' : ''
                        }`}
                        alt="Cookie"
                    />
                </div>

                {/* Fake Error Dialog */}
                {showErrorDialog && (
                    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-70">
                        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-w-md w-full p-6 animate-fade-in">
                            <h4 className="text-red-500 font-bold text-lg mb-4">Oops! Something went wrong! 😱</h4>
                            <p className="text-gray-700 dark:text-gray-300 mb-6">It looks like we encountered an issue. Do you want to refresh the page?</p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => {
                                        handleDialogAction('cancel')
                                        completeCaptcha()
                                    }}
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
            </div>

            {/* Animations */}
            <style jsx>{`
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
            `}</style>
        </div>
    );
}
