import { useEffect, useState } from 'react';
import Captcha from './Captcha';
import BigBangTheoryQuiz from './BigBangTheoryQuiz';
import CookieClicker from './CookieClicker';
import BakingTime from './BakingTime';

const CookieConsentBanner = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCaptchaVisible, setCaptchaVisible] = useState(false);
  const [hasFinishedShowing, setHasFinishedShowing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Automatically show the modal when the component mounts
    setModalVisible(true);
    document.body.style.overflow = 'hidden';

    setTimeout(function () {
        setHasFinishedShowing(true);
    }, 0.4);
  }, []);

  const closeModal = () => {
    setModalVisible(false);
    document.body.style.overflow = 'auto';
  };

  const completeCaptcha = () => {
    setCaptchaVisible(false);
    setCurrentStep(currentStep + 1);
  }

  return (
    <>
      {isModalVisible && (
        <>
          {currentStep === 0 && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-w-lg w-full animate-move-up">
                <div className="flex justify-between items-center border-b dark:border-neutral-700 p-4">
                  <h3 className="font-bold text-gray-800 dark:text-white">
                    Do you like cookies? 🍪
                  </h3>
                </div>
                <div className="p-4 text-gray-800 dark:text-neutral-400">
                  <p>This website uses cookies to <strong>improve your user experience</strong>. Please accept our use of cookies to continue using this site.</p>
                </div>
                <div className="flex justify-end gap-2 p-4 border-t dark:border-neutral-700">
                  <button
                    onClick={() => setCaptchaVisible(true)} // Move to next step
                    className="py-2 px-4 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                    disabled={!hasFinishedShowing}
                  >
                    No
                  </button>
                  <button
                    onClick={() => setCaptchaVisible(true)} // Move to next step
                    className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    disabled={!hasFinishedShowing}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-w-lg w-full animate-move-up">
                <div className="flex justify-between items-center border-b dark:border-neutral-700 p-4">
                  <h3 className="font-bold text-gray-800 dark:text-white">
                    But what about chocolate chip cookies? 🍪
                  </h3>
                </div>
                <div className="p-4 text-gray-800 dark:text-neutral-400">
                  <p>It's important for us to know your cookie preferences to enhance your experience on this site.</p>
                </div>
                <div className="flex justify-end gap-2 p-4 border-t dark:border-neutral-700">
                  <button
                    onClick={() => setCurrentStep(0)} // Go back to previous step
                    className="py-2 px-4 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                    disabled={!hasFinishedShowing}
                  >
                    I dislike them
                  </button>
                  <button
                    onClick={() => setCaptchaVisible(true)} // Go to captcha step
                    className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    disabled={!hasFinishedShowing}
                  >
                    I like them
                  </button>
                </div>
              </div>
            </div>
          )}


          {currentStep === 2 && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-w-lg w-full animate-move-up">
                <div className="flex justify-between items-center border-b dark:border-neutral-700 p-4">
                  <h3 className="font-bold text-gray-800 dark:text-white">
                    What about oatmeal raisin? 🍪
                  </h3>
                </div>
                <div className="p-4 text-gray-800 dark:text-neutral-400">
                  <p>It's important for us to know your cookie preferences to enhance your experience on this site.</p>
                </div>
                <div className="flex justify-end gap-2 p-4 border-t dark:border-neutral-700">
                  <button
                    onClick={() => setCaptchaVisible(true)} // Go to captcha step
                    className="py-2 px-4 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                    disabled={!hasFinishedShowing}
                  >
                    I dislike them
                  </button>
                  <button
                    onClick={() => setCaptchaVisible(true)} // Go to captcha step
                    className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    disabled={!hasFinishedShowing}
                  >
                    I like them
                  </button>
                </div>
              </div>
            </div>
          )}


          {currentStep === 3 && (
            <BakingTime completeCaptcha={completeCaptcha}/>
          )}
        </>
      )}

      {/* CAPTCHA MODAL */}
      {isCaptchaVisible && (
        <>
          {currentStep === 0 && (
            <Captcha completeCaptcha={completeCaptcha}/>
          )}

          {currentStep === 1 && (
            <BigBangTheoryQuiz completeCaptcha={completeCaptcha}/>
          )}

          {currentStep === 2 && (
            <CookieClicker completeCaptcha={completeCaptcha}/>
          )}
        </>
      )}

      <style jsx>{`
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
          animation: moveUp 0.4s ease-in-out;
        }


        @keyframes scaleUp {
          from {
            scale: 0;
          }
          to {
            scale: 1;
          }
        }

        .animate-fade-in {
          animation: scaleUp 0.4s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default CookieConsentBanner;
