import React from "react";
import AudioPlayComponent from "../AudioPlay/AudioPlayComponent";
import useDictionaryStore from "../../store/dictionaryStore";

const SearchedWordComponent = () => {
  const { wordData } = useDictionaryStore();

  if (!wordData) return null;

  return (
    <div className="flex justify-between items-center my-8 ml-2">
      {/* Left side: Word and Phonetic */}
      <div>
        <h1 className="text-4xl md:text-6xl font-bold text-left capitalize dark:text-white">
          {wordData.word}
        </h1>
        {wordData.phonetic && (
          <p
            className="text-purple-600 text-left text-sm md:text-xl mt-2"
            style={{ color: "#A445ED" }}>
            {wordData.phonetic}
          </p>
        )}
      </div>

      {/* Right side: Audio Play Button */}
      {wordData.audio && (
        <div className="ml-4">
          <AudioPlayComponent audioUrl={wordData.audio} />
        </div>
      )}
    </div>
  );
};

export default SearchedWordComponent;
