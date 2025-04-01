import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Linking } from 'react-native';
import { Audio } from 'expo-av';

const DisplayDef = ({ data, selectedFont, theme }) => {

  const [sound, setSound] = useState();
  const [pressed, setPressed] = useState(false);

  const handlePlayAudio = async (audio) => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({ uri: audio });
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
    <Text style={[styles.title, { fontFamily: selectedFont, color: theme.text}]} testID='display-def'>
      {data.word}
    </Text>
    {data.phonetics.map((phonetic, index) => (
      <View key={index} style={styles.phoneticLayout}>
        <Text style={[styles.phonetic, { fontFamily: selectedFont}]}>{phonetic.text}</Text>
        {phonetic.audio && (
          <Pressable 
          
          onPressIn={() => {
            // Change background color when pressed
            setPressed(true); // useState hook to manage pressed state
          }}
          onPressOut={() => {
            // Reset background color when press is released
            setPressed(false); // useState hook to manage pressed state
          }}
          onPress={() => handlePlayAudio(phonetic.audio)}
        >
          <Image
            style={styles.audioButton}
            source={pressed ? require('../assets/images/icon-play-hover.png') : require('../assets/images/icon-play.png')}
            testID='audio-button'
          />
        </Pressable>
        )}
      </View>
    ))}
    {data.meanings.map((meaning, index) => (
      <View key={index} style={styles.meaningContainer}>
        <View style={styles.partOfSpeechContainer}>
          <Text style={[styles.partOfSpeech, { fontFamily: selectedFont, color: theme.text }]}>{meaning.partOfSpeech}</Text>
          <View style={styles.partOfSpeechDivider} />
        </View>
        <Text style={[styles.subtitle, { fontFamily: selectedFont }]}>Meaning</Text>
        {meaning.definitions.map((definition, subIndex) => (
          <View key={subIndex}>
            <View style={styles.definitionContainer}>
              <Text style={styles.bullet}>{'\u2022'}</Text>
              <Text style={[styles.definition, { fontFamily: selectedFont, color: theme.text }]}>{definition.definition}</Text>
            </View>
            {definition.example && <Text style={[styles.example, { fontFamily: selectedFont }]}>"{definition.example}"</Text>}
            {definition.synonyms.length > 0 && (
            <View style={styles.synonymsContainer}>
              <Text style={[styles.synonyms, { fontFamily: selectedFont }]}>Synonyms:</Text>    
              <Text style={[styles.synonymsEntries, { fontFamily: selectedFont }]}>{definition.synonyms.join(', ')}</Text>
            </View>
            )}
            {definition.antonyms.length > 0 && (
            <View style={styles.synonymsContainer}>
              <Text style={[styles.synonyms, { fontFamily: selectedFont }]}>Antonyms:</Text>    
              <Text style={[styles.synonymsEntries, { fontFamily: selectedFont }]}>{definition.antonyms.join(', ')}</Text>
            </View>
            )}
          </View>
        ))}
      </View>
    ))}
  <View style={styles.bottomDivider} />
  <View style={styles.sourceUrlsContainer}>
        <Text style={[styles.sourceUrlsTitle, { fontFamily: selectedFont, color: theme.text }]}>Source:</Text>
        {data.sourceUrls.map((url, index) => (
        <View key={index} style={{flexDirection: 'row'}}>
          <Text  style={[styles.sourceUrl, { fontFamily: selectedFont, color: theme.text }]} onPress={() => Linking.openURL(url)}>
            {url}
          </Text>
          <Pressable onPress={() => Linking.openURL(url)}>
            <Image source={require('../assets/images/icon-new-window.png')} onPress={() => Linking.openURL(url)}/>
          </Pressable>
        </View>
        ))}
        
      </View>
  </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  phonetic:{
    fontSize: 15,
    color: '#A445ED',
  },
  phoneticLayout:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  audioButton:{
    height: 50,
    width: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  meaningContainer:{
    marginBottom: 10,
    marginRight: 10,
  },
  bullet: {
    marginTop: 5,
    fontSize: 14,
    marginRight: 10,
    color: '#A445ED', // Adjust the color of the bullet point as needed
  },
  definitionContainer: {
    marginBottom: 5,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 10,
    color: '#757575',
    marginBottom: 5,
  },
  partOfSpeechContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  partOfSpeech: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
  },
  partOfSpeechDivider: {
    height: 1,
    flex: 1,
    backgroundColor: '#E6E6E6', // You can change the color of the divider
    marginLeft: 10, // Adjust the spacing as needed
    marginRight: 10,
  },
  definition: {
    fontSize: 12,
    marginTop: 5,
  },
  example: {
    fontSize: 12,
    marginTop: 5,
    marginLeft: 25,
    color: '#757575',
  },
  synonymsContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 14,
    marginTop: 5,
  },
  synonyms: {
    color: '#757575',
  },
  synonymsEntries:{
    color: '#A445ED',
    marginLeft: 10,
    flexDirection: 'row'
  },
  bottomDivider:{
    height: 1,
    flex: 1,
    backgroundColor: '#E6E6E6', // You can change the color of the divider
    marginLeft: 10, // Adjust the spacing as needed
    marginRight: 30,
  },
  sourceUrlsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    
  },
  sourceUrlsTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#757575',
  },
  sourceUrl: {
    fontSize: 10,
    color: 'black',
    textDecorationLine: 'underline',
    marginLeft: 10,
    marginRight: 5,
  },
});

export default DisplayDef;