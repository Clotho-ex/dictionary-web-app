import React from "react";
import AudioPlayComponent from "../AudioPlay/AudioPlayComponent";

const SearchedWordComponent = ({ word, phonetic, audioUrl }) => {
  return (
    <div className="flex justify-between items-center my-8">
      {/* Left side: Word and Phonetic */}
      <div>
        <h1 className="text-4xl md:text-6xl font-bold text-left capitalize dark:text-white">
          {word}
        </h1>
        {phonetic && (
          <p
            className="text-purple-600 text-left text-lg md:text-xl mt-2"
            style={{ color: "#A445ED" }}>
            {phonetic}
          </p>
        )}
      </div>

      {/* Right side: Audio Play Button */}
      {audioUrl && (
        <div className="ml-4">
          <AudioPlayComponent audioUrl={audioUrl} />
        </div>
      )}
    </div>
  );
};

export default SearchedWordComponent;
