import { useEffect, useState } from 'react';
import Captcha from './Captcha';
import BigBangTheoryQuiz from './BigBangTheoryQuiz';
import CookieClicker from './CookieClicker';
import BakingTime from './BakingTime';

const CookieConsentBanner = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCaptchaVisible, setCaptchaVisible] = useState(false);
  const [hasFinishedShowing, setHasFinishedShowing] = useState(false);
  const [currentStep, setCurrentStep] = useState(2);
  const [forcedToAcceptAlert, showForcedToAcceptAlert] = useState(false);

  const [, setCanProceed] = useState(false); // Button state to check if user scrolled to the bottom

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

  // Handle the scroll event
  // @ts-ignore
  const handleScroll = (e) => {
    const element = e.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      setCanProceed(true); // Enable button when fully scrolled
    }
  };

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
                    onClick={() => {
                      showForcedToAcceptAlert(true);
                      setTimeout(() => {
                        showForcedToAcceptAlert(false);
                      }, 5000);
                    }} // Move to next step
                    className="py-2 px-4 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                    disabled={!hasFinishedShowing}
                  >
                    No
                  </button>
                  <button
                    onClick={() => {
                      setCaptchaVisible(true);
                    }} // Move to next step
                    className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    disabled={!hasFinishedShowing}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sorry, but our policy states that you must like cookies at this bakery. 🍪 */}
          {forcedToAcceptAlert && (
            <div
              className="fixed inset-0 mt-10 z-100 flex items-start justify-center pointer-events-none"
              style={{ zIndex: 1000 }} // Ensure this alert is in front of everything else
            >
              <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-w-md w-full p-6 animate-fade-in pointer-events-auto">
                <h3 className="text-gray-700 dark:text-gray-300 text-xl font-bold">
                  Sorry, but our policy states that you must like cookies. 🍪
                </h3>
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
            <BakingTime completeCaptcha={completeCaptcha} />
          )}

          {currentStep === 4 && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300 ease-out">
                <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
                    Wait, you forgot to read our cookie policy!
                  </h3>
                  <p>It is required that you read through this policy thoroughly and don't skip any sections.</p>
                </div>
                <div className="flex flex-col items-center gap-6 p-6 border-t border-gray-200 sdark:border-neutral-800 h-[60vh] overflow-y-scroll no-scrollbar" id="cookie-policy">
                  <div id='top' className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-6 no-scrollbar">
                    {[...Array(149)].map((_, i) => (
                      <p key={i}>
                        <strong>Section {i + 1} - The Eternal Cookie Chronicles:</strong> Cookies are life. Cookies are love. Cookies track your every movement with
                        precision that would make NASA jealous. Have you ever stopped to think about how incredible cookies really are? Well, buckle up, because you're about to.
                        <br /><br />
                        Every cookie we bake (digitally, of course) is a work of art. A masterpiece designed not just to invade your privacy, but to *enhance* it. Our cookies
                        do not merely collect data; they absorb your soul... your cookie soul. Yes, we know your deepest desires—especially when it comes to snacking.
                        <br /><br />
                        <em>Fun Fact #{i + 1}:</em> The longest cookie ever created was 400 meters long, and guess what? Our cookie policy is about to surpass that in length.
                        Keep scrolling; it only gets better.
                        <br /><br />
                        We use cookies to determine if you're left-handed, right-handed, or ambidextrous, whether you prefer cats or dogs, and even whether you're the type
                        of person who picks the blue pill or the red pill. We store it all. And we mean <strong>all</strong> of it.
                        <br /><br />
                        We share your cookie-tasting data with an elite group of cookie scientists who analyze your preferences and send them to snack manufacturers around the world.
                        Don't like it? Too bad! You've already eaten the cookies.
                        <br /><br />
                        And now, having reached Section {i + 1}, we want to congratulate you. You have officially read more cookie policy than 99.9% of humanity. But don’t give up, there's still a long way to go!
                        <br /><br />
                        Continuing this policy may cause severe boredom, hunger, and a sudden urge to eat chocolate chip cookies. We are not responsible for any
                        emotional trauma caused by this cookie policy. But hey, you signed up for this the moment you clicked 'Yes' when we first asked if you liked cookies.
                      </p>
                    ))}

                    <div className="text-center text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-6">
                      <p>
                        <strong>Section 150 - The Final Cookie Frontier:</strong> Congratulations! You have officially reached the end of the cookie policy. You are now
                        a cookie policy expert. You can now add this to your resume, LinkedIn profile, and all other profiles.
                        <br /><br />
                        If you have any questions, comments, or concerns about our cookie policy, please don't reach out to our team of cookie experts as we are way too busy.
                        <br /><br />
                        Thank you for reading our cookie policy. We hope you have enjoyed this journey into the world of cookies. Remember, cookies are life.
                        Cookies are love. Cookies are watching you.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 flex justify-end border-t border-gray-200 dark:border-neutral-800 space-x-5">
                    <a
                      href='#top'
                      className="py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-transform transform hover:scale-105"
                    >
                      I don't understand!
                    </a>
                    <button
                      onClick={() => {
                        alert('Congratulations! You now have a basket full of cookies to enjoy while you continue browsing this site.')
                        closeModal();
                      }}
                      className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
                    >
                      I understand!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}



        </>
      )}

      {/* CAPTCHA MODAL */}
      {isCaptchaVisible && (
        <>
          {currentStep === 0 && (
            <Captcha completeCaptcha={completeCaptcha} />
          )}

          {currentStep === 1 && (
            <BigBangTheoryQuiz completeCaptcha={completeCaptcha} />
          )}

          {currentStep === 2 && (
            <CookieClicker completeCaptcha={completeCaptcha} />
          )}
        </>
      )}

      <style>{`

        * {
          scroll-behavior: smooth;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

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

        @keyframes scaleDown {
          from {
            scale: 1;
            opacity: 1;
          }
          to {
            scale: 0;
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: scaleUp 0.4s ease-in-out;
        }

        .animate-fade-out {
            animation: scaleDown 0.4s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default CookieConsentBanner;
