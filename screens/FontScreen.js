import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontContext from '../context/FontContext';
import { useTheme } from '../context/ThemeContext';

function FontScreen({ navigation }) {

  const { selectedFont, changeFont } = useContext(FontContext);
  const { colors } = useTheme();

  const handleFontChange = (font) => { // Corrected function name
    changeFont(font);
    
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[styles.title, { fontFamily: selectedFont, color: colors.text }]} testID='font'>Current Font: {selectedFont}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleFontChange('sans-serif')}
        testID='sans-serif-button'
      >
        <Text style={styles.buttonText}>Sans Serif</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleFontChange('serif')}
        testID='serif-button'
      >
        <Text style={styles.buttonText}>Serif</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleFontChange('monospace')}
        testID='monospace-button'
      >
        <Text style={styles.buttonText}>Mono</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#A445ED',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default FontScreen;
