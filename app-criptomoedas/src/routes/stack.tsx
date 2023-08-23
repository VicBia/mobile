import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Details from '../screens/Details';
import { propsNavigationStack } from '../models';

const Stack = createNativeStackNavigator<propsNavigationStack>();

export default function StackComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: '', headerTransparent: true, headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{ title: '', headerTransparent: true, headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
