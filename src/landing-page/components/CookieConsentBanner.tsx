import { useState, useRef } from 'react';
import { cn } from '../cn';

const MovingCookieConsentBanner = () => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [hasMousedOver, setHasMousedOver] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = () => {
    if (!hasMousedOver) setHasMousedOver(true)
    const divWidth = divRef.current ? divRef.current.offsetWidth : 0;
    const divHeight = divRef.current ? divRef.current.offsetHeight : 0;

    const newPosition = {
      top: Math.random() * (window.innerHeight - divHeight - 30), // subtract divHeight
      left: Math.random() * (window.innerWidth - divWidth - 30), // subtract divWidth
    };
    console.log('new position: ', newPosition);
    setPosition(newPosition);
  };

  return (
    <div
      style={{ position: 'absolute', top: position.top, left: position.left }}
      onMouseOver={handleMouseOver}
    >
      <div
        className={cn(
          {
            'fixed bottom-0 left-0 w-full bg-blue-500 text-white p-4 flex justify-between items-center ':
              !hasMousedOver,
          },
          {
            'min-w-full bg-blue-500 text-white p-4 flex justify-between items-center ':
              hasMousedOver,
          }
        )}
      >
        <div>
          <p className="font-bold">This website uses cookies</p>
          <p>
            We use cookies to ensure you get the best experience on our website.
          </p>
        </div>
        <button
          disabled={hasMousedOver}
          className="bg-white text-blue-500 px-4 py-2 rounded"
        >
          Accept
        </button>
      </div>
      {/* <div id='cookieconsent'></div> */}
    </div>
  );
};

export default MovingCookieConsentBanner;
