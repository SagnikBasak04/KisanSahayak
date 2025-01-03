import React, { useEffect, useRef } from 'react';

const Translate = () => {
    const googleTranslateRef = useRef(null);

    useEffect(() => {
        let intervalId;
        const checkGoogleTranslate = () => {
            if (window.google && window.google.translate) {
                clearInterval(intervalId);
                new window.google.translate.TranslateElement(
                    { pageLanguage: 'en', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
                    googleTranslateRef.current
                );
                console.log("Ref inside useEffect:", googleTranslateRef.current); // Log after initialization
            }
        };
        intervalId = setInterval(checkGoogleTranslate, 100);

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);

    return (
        <div>
            <div ref={googleTranslateRef}></div>
        </div>
    );
};

export default Translate;