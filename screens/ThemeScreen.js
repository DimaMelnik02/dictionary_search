import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import FontContext from '../context/FontContext';

const ThemeScreen = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const { selectedFont } = useContext(FontContext);

  const handleToggleTheme = () => {
    toggleTheme();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { fontFamily: selectedFont, color: colors.text }]} testID='theme'>Current Theme: {theme}</Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.buttonBackground, borderColor: colors.text }]} onPress={handleToggleTheme} testID='theme-button'>
        <Text style={[styles.buttonText, {fontFamily: selectedFont, color: colors.text}]} >Toggle Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ThemeScreen;
