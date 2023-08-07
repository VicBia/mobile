import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React, { useState, useEffect } from "react";

function CriptoCoin(props: any) {
  return (
    <View style={styles.cripto}> 
      <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 10}}>
        <Image source={{
          uri: props.icon,
        }} style={{width: 24, height: 24}}/>
        <Text style={{fontSize: 20, color: 'white'}}>{props.name}</Text>
      </View>
      <Text style={{fontSize: 20, color: '#D49900', fontWeight: "600"}}>R$ {props.value}</Text>
    </View>
  );
}

export default function App() {
  const [data, setData] = useState<any[]>([]);

  const getCriptoCoins = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCriptoCoins();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={{fontSize: 20, color: 'white', textTransform: "uppercase", fontWeight: "bold"}}>
            Criptomoedas
          </Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <CriptoCoin icon={item.image} name={item.name} value={item.current_price}/>
          )}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    paddingTop: 24
  },
  cripto: {
    backgroundColor: "#0F0505",
    fontSize: 20,
    color: 'white',
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 68,
    width: "100%",
    marginTop: 17,
    paddingHorizontal: 17
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 68,
    backgroundColor: "#080303",
  }
});
