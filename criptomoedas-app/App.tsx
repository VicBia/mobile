import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, FlatList, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useMemo } from "react";

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
  const [text, onChangeText] = React.useState('');
  const filteredData = useMemo(() => {
    return data.filter(coin => coin.name.toLowerCase().includes(text.toLowerCase()));
  }, [text]);

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
              data={filteredData}
              keyExtractor={({id}) => id}
              renderItem={({item}) => (
                <CriptoCoin icon={item.image} name={item.name} value={item.current_price}/>
              )}
            />

            <View style={styles.inputArea}>
              <SafeAreaView>  
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeText}
                  value={text}
                  keyboardType="default"
                />
              </SafeAreaView>

              <TouchableOpacity onPress={() => {}} style={{position: "absolute", left: 30, top: 30} }>
                <View>
                  <Image source={require('./assets/search.png')} style={{width: 36, height: 36}}/>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {onChangeText('')}} style={{position: "absolute", right: 30, top: 33} }>
                <View>
                  <Image source={require('./assets/x.png')} style={{width: 32, height: 32}}/>
                </View>
              </TouchableOpacity>

          </View>
        </View>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
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
  },
  input: {
    fontSize: 22,
    fontWeight: "500",
    paddingHorizontal: 60,
    height: 74,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
  },
  inputArea: {
    position: "relative",
    paddingVertical: 10,
    width: "100%",
    paddingHorizontal: 11,
    backgroundColor: "#000",
  }
});
