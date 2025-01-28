import React, { useState } from "react";
import { Search } from "lucide-react";
import useDictionaryStore from "../../store/dictionaryStore";

const SearchBarComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, error, searchWord } = useDictionaryStore();

  const handleSearch = async (e) => {
    e?.preventDefault();
    searchWord(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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
        message: "Please enter a valid word (letters and spaces only).",
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
        <p className="text-center text-gray-500">{config.message}</p>
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
            className="bg-whiteSmoke rounded-xl p-2.5 w-full focus:placeholder:text-transparent placeholder:text-black placeholder:text-bold placeholder:text-heading-S focus:outline-none focus:ring-2 focus:ring-purple text-black text-lg"
            disabled={isLoading}
          />
          <button
            type="submit"
            aria-label="Search"
            className="flex items-center justify-center bg-whiteSmoke rounded-xl p-2.5 absolute right-0 focus:outline-none focus:ring-2 focus:ring-purple disabled:opacity-50"
            disabled={isLoading}>
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple"></div>
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
