import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import App from '../App';
import { Audio } from 'expo-av';

//test if app renders correctly
test('renders correctly', async() => {
    const { getByTestId } = render(<App />);
    const homeScreen = getByTestId('home-screen');
    expect(homeScreen).toBeDefined();
}, 3000);

//test if input value updates correctly
test('input value updates correctly', async() => {
    const { getByTestId } = render(<App />);
    const input = getByTestId('input');
    fireEvent.changeText(input, 'example');
    expect(input.props.value).toBe('example');
}, 3000);

//test if definition state updates correctly
test('the searched word is found and being displayed', async () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId('input');
    fireEvent.changeText(input, 'example');
    fireEvent.press(getByTestId('search-button'));
    await waitFor(() => {
      const wordElement = getByTestId('display-def');
      const word = wordElement.props.children;
      expect(word).toBe('example');
    });
  }, 10000);

//test if user searches for an empty string
test('user searches for an empty string', async() => {
    const { getByTestId } = render(<App />);
    fireEvent.press(getByTestId('search-button'));
    const emptyString = getByTestId('empty-string');
    expect(emptyString).toBeDefined();
}, 3000);

//test if user searches for a word that doesn't exist
test('the searched word is not found', async () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId('input');
    fireEvent.changeText(input, 'jshrudh');
    fireEvent.press(getByTestId('search-button'));
    await waitFor(() => {
      const wordElement = getByTestId('no-def-found');
      const word = wordElement.props.children;
      //expect error message to be displayed
        expect(word).toBe('No Definitions Found');
    });
  }, 10000);

//test if user changes the theme
test('user changes the theme', async () => {
    const { getByTestId } = render(<App />);
    fireEvent.press(getByTestId('theme-button-home'));
    fireEvent.press(getByTestId('theme-button'));
    const themeTextElement = getByTestId('theme');
    const themeText = themeTextElement.props.children.join('');
    expect(themeText).toBe('Current Theme: dark');
  }, 3000);

//test if user changes the font
test('user changes the font', async() => {
    const { getByTestId } = render(<App />);
    fireEvent.press(getByTestId('font-button'));
    fireEvent.press(getByTestId('sans-serif-button'));
    const font = getByTestId('font');
    const fontText = font.props.children.join('');
    expect(fontText).toBe('Current Font: sans-serif');
}, 3000);

jest.mock('expo-av', () => {
    const actual = jest.requireActual('expo-av');
    const mockSound = {
      playAsync: jest.fn()
    };
    return {
      ...actual,
      Audio: {
        ...actual.Audio,
        Sound: {
          ...actual.Audio.Sound,
          createAsync: jest.fn(() => Promise.resolve({ sound: mockSound }))
        }
      }
    };
  });
//test play sound button from word definition
test('the searched words audio is being played', async () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId('input');
    fireEvent.changeText(input, 'example');
    fireEvent.press(getByTestId('search-button'));
    // Simulate pressing the audio button
    await waitFor(() => {
        fireEvent.press(getByTestId('audio-button'));
    });
    // Assert that createAsync method was called with the correct URI
    expect(Audio.Sound.createAsync).toHaveBeenCalledWith({ uri: 'https://api.dictionaryapi.dev/media/pronunciations/en/example-us.mp3' });
    
    // Assert that playAsync method of the sound object was called
    const { sound } = await Audio.Sound.createAsync.mock.results[0].value;
    expect(sound.playAsync).toHaveBeenCalled();
  }, 12000);