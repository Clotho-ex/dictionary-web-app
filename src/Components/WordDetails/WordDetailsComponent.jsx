import React from "react";
import useDictionaryStore from "../../store/dictionaryStore";
import { SquareArrowOutUpRight } from "lucide-react";

const WordDetailsComponent = () => {
  const { wordData } = useDictionaryStore();

  if (!wordData) return null;

  // Filter only noun and verb meanings
  const filteredMeanings = wordData.meanings.filter((meaning) =>
    [
      "noun",
      "pronoun",
      "proper noun",
      "verb",
      "adverb",
      "adjective",
      "exclamation",
      "interjection",
      "conjunction",
    ].includes(meaning.partOfSpeech.toLowerCase())
  );

  return (
    <div className="space-y-8 mt-6">
      {filteredMeanings.map((meaning, meaningIndex) => (
        <div
          key={`${meaning.partOfSpeech}_${meaningIndex}`}
          className="space-y-4">
          {/* Part of Speech Header with Divider */}
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold capitalize">
              {meaning.partOfSpeech}
            </h2>
            <div className="flex-grow h-px bg-black dark:bg-white" />
          </div>

          {/* Definitions */}
          <h3 className="text-left text-blackLightest">Meaning</h3>
          <ul className="space-y-3 list-disc pl-6 text-left font-medium ">
            {meaning.definitions.slice(0, 5).map((def, index) => (
              <li key={index}>
                {def.definition}

                {/* Show examples ONLY for verbs */}
                {meaning.partOfSpeech.toLowerCase() === "verb" &&
                  def.example && (
                    <p className="text-sm font-normal italic mt-1 ml-4">"{def.example}"</p>
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
        <div className="flex items-center pt-4 border-t text-left">
          <span className="text-md font-medium">Source: </span>
          <a
            href={wordData.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 mr-3 text-purple underline underline-offset-2 hover:text-violet-600">
            {wordData.sourceUrl}
          </a>
          <SquareArrowOutUpRight size={20} />
        </div>
      )}
    </div>
  );
};

export default WordDetailsComponent;
