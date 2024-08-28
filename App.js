import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import FontScreen from './screens/FontScreen';
import ThemeScreen from './screens/ThemeScreen';
import { FontProvider } from './context/FontContext';
import { ThemeProvider } from './context/ThemeContext';

const Stack = createStackNavigator();
//<Stack.Navigator>
const App = () => {
  return (
  <FontProvider>
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Font" component={FontScreen} />
          <Stack.Screen name="Theme" component={ThemeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  </FontProvider>
  );
};

export default App;
