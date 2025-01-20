import React, { useState, useRef } from "react";
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
  React.useEffect(() => {
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
  React.useEffect(() => {
    audioRef.current.src = audioUrl;
  }, [audioUrl]);

  return (
    <button
      onClick={handlePlay}
      disabled={!audioUrl}
      className={`
        inline-flex items-center justify-center
        w-8 h-8 rounded-full
        ${
          audioUrl
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }
        transition-colors duration-200
      `}
      aria-label={isPlaying ? "Pause pronunciation" : "Play pronunciation"}>
      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
    </button>
  );
};

export default AudioPlayButton;
