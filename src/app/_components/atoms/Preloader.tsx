'use client'
import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 1500); 
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  return (
    <div
      className={`preloader fixed top-0 left-0 w-full h-full flex justify-center items-center bg-background ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } z-50 transition-opacity duration-150`}
    >
      <img
        src="https://uploads-ssl.webflow.com/63d135a605f3157f4b1add55/63d135a605f315808b1adf0b_loader_three-dots-white.svg"
        loading="lazy"
        alt=""
        className="preloader-image w-40"
      />
    </div>
  );
};

export default Preloader;
