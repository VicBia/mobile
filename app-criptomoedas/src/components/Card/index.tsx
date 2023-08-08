import { StatusBar } from 'expo-status-bar';
import { Contain, Box, Text1, Text2, ImageTiny } from './styles';
import { ICoins } from '../../models/interfaces';

export default function CardItem({ name, current_price, image }: ICoins) {
  return (
    <Contain>
      <Box>
        <ImageTiny source={{ uri: image }} />
        <Text1>{name}</Text1>
      </Box>
      <Text2>R$ {current_price}</Text2>
    </Contain>
  );
}
