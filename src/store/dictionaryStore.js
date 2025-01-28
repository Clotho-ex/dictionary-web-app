// src/store/dictionaryStore.js
import { create } from "zustand";

// API function integrated into the store file
const fetchWordDefinition = async (word) => {
  // Handle empty or whitespace-only input
  if (!word || !word.trim()) {
    console.error("Error: Empty search term");
    throw new Error("Please enter a word to search.");
  }

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
        word.trim()
      )}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(errorData.message || "Word not found");
    }

    const [data] = await response.json();
    console.log("API Response:", data);

    const audioFile = data.phonetics?.find((p) => p.audio)?.audio || "";

    return {
      word: data.word,
      phonetic: data.phonetic || "No Phonetic",
      audio: audioFile,
      meanings: data.meanings.map((meaning) => ({
        partOfSpeech: meaning.partOfSpeech,
        definitions: meaning.definitions.map((def) => ({
          definition: def.definition,
          example: def.example || "No example available",
        })),
        synonyms: meaning.synonyms || [],
      })),
      sourceUrl: `https://en.wiktionary.org/wiki/${encodeURIComponent(
        data.word
      )}`,
    };
  } catch (error) {
    console.error("Error fetching word definition:", error);
    throw error;
  }
};

const useDictionaryStore = create((set) => ({
  // State
  wordData: null, // Stores the full word data from API
  isLoading: false,
  error: {
    type: null, // 'empty' | 'notFound' | 'invalidInput' | 'apiError' | null
    word: null, // The word that caused the error
  },

  // Actions
  searchWord: async (word) => {
    const trimmedWord = word.trim();

    // Reset states before new search
    set({
      isLoading: true,
      error: { type: null, word: null },
      wordData: null,
    });

    // Input validation
    if (!trimmedWord) {
      set({
        error: { type: "empty", word: null },
        isLoading: false,
      });
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmedWord)) {
      set({
        error: { type: "invalidInput", word: trimmedWord },
        isLoading: false,
      });
      return;
    }

    try {
      const result = await fetchWordDefinition(trimmedWord);
      set({
        wordData: result,
        isLoading: false,
        error: { type: null, word: null },
      });
    } catch (error) {
      set({
        error: {
          type: error.message === "Word not found" ? "notFound" : "apiError",
          word: trimmedWord,
        },
        isLoading: false,
        wordData: null,
      });
    }
  },

  // Reset everything to initial state
  resetState: () => {
    set({
      wordData: null,
      isLoading: false,
      error: { type: null, word: null },
    });
  },
}));

export default useDictionaryStore;
