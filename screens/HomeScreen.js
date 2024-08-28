import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image, Pressable } from 'react-native';
import axios from 'axios';
import handleSearch from '../components/handleSearch';
import DisplayDef from '../components/DisplayDef';
import FontContext from '../context/FontContext';
import { useTheme } from '../context/ThemeContext';
import NoDefFound from '../components/NoDefFound';



const HomeScreen = ({ navigation }) => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState();
  const [isEmpty, setIsEmpty] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { selectedFont } = useContext(FontContext);
  const { colors, theme } = useTheme();
  const [error, setError] = useState(false);
  const handleSearchCallback = async () => {
    if (word.trim() === '') {
      // If the input is empty, set isEmpty to true
      setIsEmpty(true);
      return; // Don't proceed with the search
    }
    try {
      const data = await handleSearch(word);
      setDefinition(data);
      setError(false);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };
  useEffect(() => {
      console.log(definition);
    }
   ,[definition]);
  
  return (
      <ScrollView contentContainerStyle={[styles.container, { fontFamily: selectedFont, backgroundColor: colors.background}]} testID='home-screen' >
        <View style={styles.topSection}>
          <View style={styles.topButtons}>
            <Pressable>
              <Image source={require('../assets/images/logo.png')}/>
            </Pressable>
              <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between', width: "30%"}}>
                <TouchableOpacity style={styles.fontButton} onPress={() => navigation.navigate('Font')}>
                  <Text style={{fontFamily: selectedFont, color: 'white'}} testID='font-button'>
                    Fonts
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Theme')} testID='theme-button-home'>
                <Image
                    source={theme === 'dark' ? require('../assets/images/icon-moon.png') : require('../assets/images/icon-sun.png')}
                    style={{ width: 30, height: 30, marginTop: 10,}}
                  />
                </TouchableOpacity>
              </View>
          </View>
          <View style={[styles.inputContainer, isEmpty && { borderColor: 'red', borderWidth: 1 } , isFocused && { borderColor: '#A445ED', borderWidth: 1 } ]}>
            <TextInput
              style={[styles.input, { fontFamily: selectedFont }]}
              placeholder="Search for any word"
              value={word}
              onChangeText={text => {setWord(text); setIsEmpty(false);}}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              testID='input'
            />
            <TouchableOpacity onPress={handleSearchCallback} testID='search-button'>
              <Image
                source={require('../assets/images/icon-search.png')}
                style={{ width: 20, height: 20, marginRight: 15,}}
              />
            </TouchableOpacity>
          </View>
          {isEmpty && (
          <Text style={styles.errorMessage} testID='empty-string'>Whoops, can't be empty...</Text>
          )}
        </View>
        {error ? (
      <NoDefFound selectedFont={selectedFont} theme={colors} />
    ) : (
      <>
        {Array.isArray(definition) && definition.length > 0 ? (
          <ScrollView style={styles.DisplayDef}> 
            {definition.map((wordData, index) => (
              <DisplayDef key={index} data={wordData} selectedFont={selectedFont} theme={colors}/>
            ))}
          </ScrollView>
        ) : ( null
        )}
      </>
    )}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topButtons:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%', // Ensure the container takes up the full width
    marginBottom: 15, // Add some bottom margin to separate from the input
  },
  topSection: {
    alignItems: 'center',
    width: '90%',
    flexGrow: 1,
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  inputContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
    borderRadius: 15,
    marginBottom: 20,
    padding: 4,
  },
  input:{
    flex: 1,
    height: 40,
    marginLeft: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorMessage: {
    fontSize: 10,
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: '6%',
    marginTop: '-5%',
  },
  button: {
    backgroundColor: '#4285f4',
    padding: 10,
    borderRadius: 5,
  },
  fontButton: {
    backgroundColor: '#A445ED',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  DisplayDef: {
    flexGrow: 1,
    width: '100%',
  },
});

export default HomeScreen;