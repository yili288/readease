import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import AudioScreen from '../screens/AudioScreen'; 

const Stack = createNativeStackNavigator();

// this is a component
export const Navigator = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AudioScreen" component={AudioScreen} />
      </Stack.Navigator>
  );
};

export default Navigator;