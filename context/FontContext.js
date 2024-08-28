import React, { createContext, useState } from 'react';

// Create the FontContext
const FontContext = createContext();

// Create a FontProvider component
export const FontProvider = ({ children }) => {
  const [selectedFont, setSelectedFont] = useState('serif');

  const changeFont = (font) => {
    setSelectedFont(font);
  };

  return (
    <FontContext.Provider value={{ selectedFont, changeFont }}>
      {children}
    </FontContext.Provider>
  );
};

export default FontContext;
