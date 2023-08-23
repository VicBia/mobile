import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type propsNavigationStack = {
  Home: {
    list: ICoinsDetails[];
  }
  Details: {
    selectedCoin: ICoinsDetails;
  };

}

export type propsNavigation = NativeStackNavigationProp<propsNavigationStack>;

export interface ICoinsDetails {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  low_24h: number;
  high_24h: number;
}

export type ICoins = {
  selectedCoin: ICoinsDetails;
}