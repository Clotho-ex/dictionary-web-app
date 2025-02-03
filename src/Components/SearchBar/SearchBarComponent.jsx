import React, { useState } from "react";
import { Search, Undo2 } from "lucide-react";
import useDictionaryStore from "../../store/dictionaryStore";

const SearchBarComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false); // Tracks if search
  const { isLoading, error, searchWord, resetState } = useDictionaryStore();

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (searchTerm.trim()) {
      await searchWord(searchTerm);
      setHasSearched(true); // Search triggered.
    } else {
      searchWord("");
      setHasSearched(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    resetState();
    setHasSearched(false);
  };

  const ErrorDisplay = () => {
    if (!error.type) return null;

    const errorConfigs = {
      empty: {
        emoji: "🤔",
        title: "Please Enter a Word",
        message: "Type a word in the search bar to find its definition.",
      },
      notFound: {
        emoji: "😕",
        title: "No Definitions Found",
        message: `Sorry, we couldn't find definitions for "${error.word}".`,
      },
      invalidInput: {
        emoji: "🚫",
        title: "Invalid Input",
        message: "Please enter a valid word.",
      },
      apiError: {
        emoji: "⚠️",
        title: "Something Went Wrong",
        message: `Sorry, we couldn't fetch definitions for "${error.word}". Please try again later.`,
      },
    };

    const config = errorConfigs[error.type];
    return (
      <div className="flex flex-col items-center justify-center mt-12 space-y-4">
        <span className="text-6xl">{config.emoji}</span>
        <h3 className="text-lg font-bold text-center">{config.title}</h3>
        <p className="text-center text-gray-500">{config.message} </p>
      </div>
    );
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="w-full">
        <div className="flex justify-center items-center relative">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search"
            aria-label="Search for a word"
            className="dark:bg-[#343434] rounded-lg p-2.5 w-full placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-purple text-lg font-semibold"
            disabled={isLoading}
          />
          <button
            type="submit"
            role="button"
            aria-label={hasSearched ? "Reset" : "Search"}
            className="flex items-center justify-center dark:bg-[#343434] rounded-xl p-2.5 absolute right-0 focus:outline-none focus:ring-2 focus:ring-purple disabled:opacity-50"
            disabled={isLoading}
            onClick={hasSearched ? handleReset : handleSearch}>
            {hasSearched ? (
              <Undo2 color="#a445ed" strokeWidth={1.75} />
            ) : (
              <Search color="#a445ed" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </form>
      <ErrorDisplay />
    </div>
  );
};

export default SearchBarComponent;
