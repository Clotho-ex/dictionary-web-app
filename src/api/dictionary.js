export const fetchWordDefinition = async (word) => {
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

    // Handle non-OK responses (e.g., 404 for word not found)
    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(errorData.message || "Word not found");
    }

    const [data] = await response.json();
    console.log("API Response:", data); // Log the full response for debugging

    // Find the first available audio file
    const audioFile = data.phonetics?.find((p) => p.audio)?.audio || "";

    // Return a structured response
    return {
      word: data.word,
      phonetic: data.phonetic || "No phonetic available",
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
    throw error; // Re-throw the error for the caller to handle
  }
};
