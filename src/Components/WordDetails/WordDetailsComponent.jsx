import React from "react";
import useDictionaryStore from "../../store/dictionaryStore";

const WordDetailsComponent = () => {
  const { wordData } = useDictionaryStore();

  if (!wordData) return null;

  // Filter only noun and verb meanings
  const filteredMeanings = wordData.meanings.filter((meaning) =>
    ["noun", "verb"].includes(meaning.partOfSpeech.toLowerCase())
  );

  return (
    <div className="space-y-8 mt-6">
      {filteredMeanings.map((meaning) => (
        <div key={meaning.partOfSpeech} className="space-y-4">
          {/* Part of Speech Header with Divider */}
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold capitalize">
              {meaning.partOfSpeech}
            </h2>
            <div className="flex-grow h-px bg-black dark:bg-white" />
          </div>

          {/* Definitions */}
          <h3 className="text-left">Meaning</h3>
          <ul className="space-y-3 list-disc pl-6 text-left font-medium ">
            {meaning.definitions.slice(0, 5).map((def, index) => (
              <li key={index} className="text-gray-600">
                {def.definition}

                {/* Show examples ONLY for verbs */}
                {meaning.partOfSpeech.toLowerCase() === "verb" &&
                  def.example && (
                    <p className="text-gray-400 text-sm mt-1 ml-4">
                      "{def.example}"
                    </p>
                  )}
              </li>
            ))}
          </ul>

          {/* Show synonyms ONLY for nouns */}
          {meaning.partOfSpeech.toLowerCase() === "noun" &&
            meaning.synonyms.length > 0 && (
              <div className="flex flex-wrap gap-2 ml-2">
                <span>Synonyms:</span>
                {meaning.synonyms.slice(0, 5).map((synonym, index) => (
                  <span key={index} className="text-purple font-medium">
                    {synonym} |
                  </span>
                ))}
              </div>
            )}
        </div>
      ))}

      {/* Source URL */}
      {wordData.sourceUrl && (
        <div className="pt-4 border-t text-left">
          <span className="text-sm">Source: </span>
          <a
            href={wordData.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple underline underline-offset-1 hover:text-purple-700">
            {wordData.sourceUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default WordDetailsComponent;
