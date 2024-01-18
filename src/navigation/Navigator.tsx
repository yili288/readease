import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OriginalText from '../screens/OriginalText';
import AudioScreen from '../screens/AudioScreen';
import HomePage from '../screens/HomePage';

const Stack = createNativeStackNavigator();

// this is a component
export const Navigator = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        <Stack.Screen name="OriginalText" component={OriginalText} />
        <Stack.Screen name="AudioScreen" component={AudioScreen} />
        <Stack.Screen name="HomePage" component={HomePage} />
      </Stack.Navigator>
  );
};

export default Navigator;