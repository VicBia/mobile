import { BoxItem, Container, Title } from './styles';
import { useState, useEffect } from 'react';
import {
  ImageBackground,
  ListRenderItemInfo
} from 'react-native';
import axios from 'axios';
import { ICoinsDetails, propsNavigationStack } from '../../models/index';
import { SearchBar } from '../../components/SearchBar/index';
import CardItem from '../../components/Card';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<ICoinsDetails[]>([]);
  const [query, setQuery] = useState('');

  async function getInfoCoins() {
    if (!loading) return;

    const { data } = await axios.get<ICoinsDetails[]>(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl'
    );
    setList(data);
    setLoading(false);
  }

  useEffect(() => {
    getInfoCoins();
  }, []);
 

  const renderItem = ({ item }: ListRenderItemInfo<ICoinsDetails>) => <CardItem coinObj={item} />;

  const updateQuery = (text: string) => {
    setQuery(text);
  };
  
  return (
    <ImageBackground
      source={require('../../assets/wallpaper.png')}
      style={{ flex: 1, width: '100%', height: '100%' }}
    >
      <Container>
        <Title>Criptomoedas</Title>
        {loading ? (
          <Title style={{ fontSize: 15, width: 150 }}>Carregando...</Title>
        ) : (
          <BoxItem
            data={list.filter((item) =>
              item.name.toLowerCase().includes(query)
            )}
            contentContainerStyle={{ flexGrow: 1, rowGap: 20 }}
            
            renderItem={renderItem}
          />
        )}

        <SearchBar handleQuery={updateQuery} />
      </Container>
    </ImageBackground>
  );
}
