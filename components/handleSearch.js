import axios from 'axios';

const handleSearch = async (word) => {
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    
    const data = response.data.map(entry => {

      // Extracting all phonetics and their corresponding audio URLs
      const phonetics = entry.phonetics.map(phonetic => ({
        text: phonetic.text,
        audio: phonetic.audio ? phonetic.audio : null
      }));

      // Extracting meanings
      const meanings = entry.meanings.map(meaning => ({
        partOfSpeech: meaning.partOfSpeech,
        definitions: meaning.definitions.map(definition => ({
          definition: definition.definition,
          example: definition.example,
          synonyms: definition.synonyms,
          antonyms: definition.antonyms,
        }))
      }));

      return {
        word: entry.word,
        phonetics: phonetics,
        meanings: meanings,
        sourceUrls: entry.sourceUrls,
      };
    });

    //console.log(data); // Log the updated data array
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default handleSearch; 