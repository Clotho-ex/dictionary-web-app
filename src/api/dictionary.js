export const fetchWordDefinition = async (word) => {
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
      throw new Error("Word not found");
    }

    const [data] = await response.json();

    // Find the first available audio file
    const audioFile = data.phonetics?.find((p) => p.audio)?.audio || "";

    return {
      word: data.word,
      phonetic: data.phonetic || "",
      audio: audioFile,
      meanings: data.meanings.map((meaning) => ({
        partOfSpeech: meaning.partOfSpeech,
        definitions: meaning.definitions.map((def) => ({
          definition: def.definition,
          example: def.example || "", // Include usage examples if available
        })),
        synonyms: meaning.synonyms || [],
      })),
      sourceUrl: `https://en.wiktionary.org/wiki/${encodeURIComponent(
        data.word
      )}`,
    };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
