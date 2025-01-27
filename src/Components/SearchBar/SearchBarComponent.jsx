import React, { useState } from "react";
import { Search } from "lucide-react";
import { fetchWordDefinition } from "../../api/dictionary";

const SearchBarComponent = ({ onSearchResult }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ type: null, word: null });

  const handleSearch = async (e) => {
    e?.preventDefault();

    if (!searchTerm.trim()) {
      setError({ type: "empty", word: null });
      return;
    }

    setIsLoading(true);
    setError({ type: null, word: null });

    try {
      const result = await fetchWordDefinition(searchTerm);
      onSearchResult(result);
    } catch (error) {
      setError({ type: "notFound", word: searchTerm });
      onSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === "Go" || e.key === "Search") {
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

    return (
      <div className="flex flex-col items-center justify-center mt-12 space-y-4">
        <span className="text-6xl">😕</span>
        <h3 className="text-lg font-bold text-center">No Definitions Found</h3>
        <p className="text-center text-gray-500">
          Sorry, we couldn't find definitions for "{error.word}".
        </p>
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
            className="flex items-center justify-center bg-whiteSmoke rounded-xl p-2.5 absolute right-0 focus:outline-none focus:ring-2 focus:ring-purple disabled:opacity-50"
            disabled={isLoading}>
            <Search color="#a445ed" strokeWidth={1.75} />
          </button>
        </div>
      </form>

      <ErrorDisplay />
    </div>
  );
};

export default SearchBarComponent;
