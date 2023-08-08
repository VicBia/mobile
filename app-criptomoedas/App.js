import { StatusBar } from 'expo-status-bar';
import { ImageBackground } from 'react-native';
import Home from './src/screens/Home/index';
import styled from 'styled-components/native';
import Wallpaper from './assets/wallpaper.png';

export default function App() {
  return (
    <Contain>
      <StatusBar style="auto" />
      <ImageBackground
        source={Wallpaper}
          
        style={{ width: '100%', height: '100%' }}
      >
        <Home />
      </ImageBackground>
    </Contain>
  );
}
const Contain = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
