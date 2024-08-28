import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    'Inconsolata-Regular': require('../assets/fonts/inconsolata/static/Inconsolata-Regular.ttf'),
    'Inter-Regular': require('../assets/fonts/inter/static/Inter-Regular.ttf'),
    'Lora-Regular': require('../assets/fonts/lora/static/Lora-Regular.ttf'),
  });

  useEffect(() => {
    const fecthFonts = async () =>{
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      console.log("Fonts loaded!");
        }
    };
    fecthFonts();
  }, [fontsLoaded]);
  if (!fontsLoaded) {

    return null;
  }
};

export default useLoadFonts;
