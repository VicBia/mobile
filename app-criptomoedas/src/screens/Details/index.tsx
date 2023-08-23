import { useNavigation } from '@react-navigation/native';
import { Container, TextCoin, TextCoinValue } from './styles';
import { Image, View, Pressable } from 'react-native';

import { propsNavigationStack } from '../../models/index'
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type propsType = NativeStackScreenProps<propsNavigationStack, 'Details'>;

export default function Details( {route, navigation}: propsType) {
  const selectedCoinData = route.params.selectedCoin;
  
  return (
    <Container>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
          marginTop: 30,
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back.png')} />
        </Pressable>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image
            source={{ uri: selectedCoinData.image }}
            style={{ width: 50, height: 50 }}
          />
          <TextCoin
            style={{ marginLeft: 20, fontSize: 24, textTransform: 'uppercase' }}
          >
            {selectedCoinData.name}
          </TextCoin>
        </View>
      </View>
      <TextCoinValue style={{ textAlign: 'center', color: '#D49900' }}>
        R$ {selectedCoinData.current_price}
      </TextCoinValue>
      <View style={{ display: 'flex', gap: 10}}>
        <TextCoin>Variação nas últimas 24h:</TextCoin>
        <TextCoin>Maior alta hoje:</TextCoin>
        <TextCoinValue style={{ color: '#D49900' }}>
          R$ {selectedCoinData.high_24h}
        </TextCoinValue>
        <TextCoin>Maior baixa hoje:</TextCoin>
        <TextCoinValue style={{ color: '#D49900' }}>
          R$ {selectedCoinData.low_24h}
        </TextCoinValue>
      </View>
    </Container>
  );
}
