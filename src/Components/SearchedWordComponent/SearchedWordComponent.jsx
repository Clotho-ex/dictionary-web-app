import React from "react";
import AudioPlayComponent from "../AudioPlay/AudioPlayComponent";
import useDictionaryStore from "../../store/dictionaryStore";

const SearchedWordComponent = () => {
  const { wordData } = useDictionaryStore();

  if (!wordData) return null;

  return (
    <div className="flex justify-between items-center my-8 ml-2">
      <div>
        <h1 className="text-4xl md:text-6xl font-semibold text-left capitalize">
          {wordData.word}
        </h1>
        {wordData.phonetic && (
          <p className="text-purple font-semibold text-left text-sm md:text-xl mt-2">
            {wordData.phonetic}
          </p>
        )}
      </div>
      {wordData.audio && (
        <div className="ml-4">
          <AudioPlayComponent audioUrl={wordData.audio} />
        </div>
      )}
    </div>
  );
};

export default SearchedWordComponent;
