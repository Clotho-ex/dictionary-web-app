import React, { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

const AudioPlayButton = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audioUrl));

  const handlePlay = () => {
    if (!audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      // Reset any existing playback
      audioRef.current.currentTime = 0;

      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
    }
  };

  // Handle audio ending
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);

    // Cleanup
    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // Update audio source if URL changes
  useEffect(() => {
    audioRef.current.src = audioUrl;
  }, [audioUrl]);

  return (
    <button
      onClick={handlePlay}
      disabled={!audioUrl}
      className={`
        inline-flex items-center justify-center rounded-full
        ${
          audioUrl
            ? "bg-purple text-white h-20 w-20 hover:bg-violet-600"
            : "bg-gray-200 cursor-not-allowed"
        }
        transition-colors duration-200
      `}
      aria-label={isPlaying ? "Pause pronunciation" : "Play pronunciation"}>
      {isPlaying ? (
        <Pause color="black" className="w-8 h-8" />
      ) : (
        <Play color="black" className="w-8 h-8 " />
      )}
    </button>
  );
};

export default AudioPlayButton;
