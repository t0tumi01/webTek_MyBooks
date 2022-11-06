import React, {useState, useEffect } from 'react';
import { Text } from 'react-native';
import {useFonts} from 'expo-font';

import Scanner from './screens/Scanner';
import Home from './screens/Home';
import AddBook from './screens/AddBook';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {

  /** Load external fonts */
  const[fontsLoaded] = useFonts({
    Rubik: require('./assets/fonts/Rubik-Regular.ttf'), 
    RubikBold: require('./assets/fonts/Rubik-Bold.ttf'),
  });

  /** Return if font loading failed */
  if(!fontsLoaded) { 
    return <Text>Requesting for Camera Permission</Text>
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="Scanner" component={Scanner}/>
      <Stack.Screen name="Add Book" component={AddBook}/>
    </Stack.Navigator>
  );
}

export default () => {
  return(
  <NavigationContainer>
    <App/>
  </NavigationContainer>
)}


