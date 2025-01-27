import React, { useState } from "react";
import { Search } from "lucide-react";
import { fetchWordDefinition } from "../../api/dictionary";

const SearchBarComponent = ({ onSearchResult = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ type: null, word: null });

  const handleSearch = async (e) => {
    e?.preventDefault();

    const trimmedTerm = searchTerm.trim();

    if (!trimmedTerm) {
      setError({ type: "empty", word: null });
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmedTerm)) {
      setError({ type: "invalidInput", word: trimmedTerm });
      return;
    }

    setIsLoading(true);
    setError({ type: null, word: null });

    try {
      const result = await fetchWordDefinition(trimmedTerm);

      // Debug: Check if onSearchResult is a function
      if (typeof onSearchResult !== "function") {
        console.error("onSearchResult is not a function:", onSearchResult);
        throw new Error("onSearchResult is not a function");
      }

      onSearchResult(result); // Pass the result to the parent component
    } catch (error) {
      if (error.message === "Word not found") {
        setError({ type: "notFound", word: trimmedTerm });
      } else {
        setError({ type: "apiError", word: trimmedTerm });
        console.error("API Error:", error);
      }
      onSearchResult(null); // Pass null to the parent component in case of error
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const ErrorDisplay = () => {
    if (!error.type) return null;

    if (error.type === "empty") {
      return (
        <div className="flex flex-col items-center justify-center mt-12 space-y-4">
          <span className="text-6xl">🤔</span>
          <h3 className="text-lg font-bold text-center">Please Enter a Word</h3>
          <p className="text-center text-gray-500">
            Type a word in the search bar to find its definition.
          </p>
        </div>
      );
    }

    if (error.type === "notFound") {
      return (
        <div className="flex flex-col items-center justify-center mt-12 space-y-4">
          <span className="text-6xl">😕</span>
          <h3 className="text-lg font-bold text-center">
            No Definitions Found
          </h3>
          <p className="text-center text-gray-500">
            Sorry, we couldn't find definitions for "{error.word}".
          </p>
        </div>
      );
    }

    if (error.type === "invalidInput") {
      return (
        <div className="flex flex-col items-center justify-center mt-12 space-y-4">
          <span className="text-6xl">🚫</span>
          <h3 className="text-lg font-bold text-center">Invalid Input</h3>
          <p className="text-center text-gray-500">
            Please enter a valid word (letters and spaces only).
          </p>
        </div>
      );
    }

    if (error.type === "apiError") {
      return (
        <div className="flex flex-col items-center justify-center mt-12 space-y-4">
          <span className="text-6xl">⚠️</span>
          <h3 className="text-lg font-bold text-center">
            Something Went Wrong
          </h3>
          <p className="text-center text-gray-500">
            Sorry, we couldn't fetch definitions for "{error.word}". Please try
            again later.
          </p>
        </div>
      );
    }

    return null;
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
