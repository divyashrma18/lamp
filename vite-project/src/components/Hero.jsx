import React, { useState, useRef, useEffect } from "react";
import "./Hero.css";

const Hero = () => {
  const [isLampOn, setIsLampOn] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const audioRef = useRef(null);
  const stopTimeoutRef = useRef(null);

  const playFirst3Seconds = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
      });
    }

    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
    }
    stopTimeoutRef.current = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
      stopTimeoutRef.current = null;
    }, 1000); 
  };

  const handleClick = () => {
    playFirst3Seconds();
    setIsBouncing(true);
    setTimeout(() => {
      setIsLampOn((v) => !v);
      setIsBouncing(false);
    }, 300); 
  };


  useEffect(() => {
    return () => {
      if (stopTimeoutRef.current) {
        clearTimeout(stopTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="hero">
      <div className={`hero-overlay ${isLampOn ? "dark" : ""}`} />

      <div className="lamp-wrapper">
        <img
          src={isLampOn ? "/images/lamp2.png" : "/images/lamp.png"}
          alt="lamp"
          className={`lamp ${isBouncing ? "bounce" : ""}`}
          />
      </div>
      <div className="string-hotspot" onClick={handleClick}></div>
      <audio ref={audioRef} src="/sounds/stretch.mp3" preload="auto" />
    </div>
  );
};

export default Hero;
