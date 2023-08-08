import { BoxItem, Container, Title } from './styles';
import { useState, useEffect } from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import axios from 'axios';
import { ICoins } from '../../models/interfaces';
import { SearchBar } from '../../components/SearchBar/index';
import CardItem from '../../components/Card';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<ICoins[]>([]);
  const [query, setQuery] = useState('');

  const updateQuery = (text: string) => {
    setQuery(text);
  };

  async function getInfoCoins() {
    if (!loading) return;

    const { data } = await axios.get<ICoins[]>(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl'
    );
    setList(data);
    setLoading(false)
  }

  useEffect(() => {
    getInfoCoins();
  }, []);

  function renderItem({ item }: ListRenderItemInfo<ICoins>) {
    return <CardItem {...item} />;
  }

  return (
    <Container>
      <Title>Criptomoedas</Title>
        {loading ? (
          <Title style={{ fontSize: 15, width: 150}}>Carregando...</Title>
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
  );
}
