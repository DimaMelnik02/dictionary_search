// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);
const Themes = {
    light: {
      text: 'black',
      background: 'white',
    },
    dark: {
      text: 'white',
      background: 'black',
    },
  };

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, colors: Themes[theme]}}>
      {children}
    </ThemeContext.Provider>
  );
};
