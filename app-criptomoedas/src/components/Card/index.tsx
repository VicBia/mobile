import { StatusBar } from 'expo-status-bar';
import { Contain, Box, Text1, Text2, ImageTiny } from './styles';
import { useNavigation } from '@react-navigation/native';

const CardItem = ({ coinObj }) => {

  const navigation = useNavigation();
  return (
    <Contain activeOpacity={0.7} onPress={() => {
      navigation.navigate('Details', { selectedCoin: coinObj })
    }} >
      <Box>
        <ImageTiny source={{ uri: coinObj.image }} />
        <Text1>{coinObj.name}</Text1>
      </Box>
      <Text2>R$ {coinObj.current_price}</Text2>
    </Contain>
  );
}

export default CardItem;