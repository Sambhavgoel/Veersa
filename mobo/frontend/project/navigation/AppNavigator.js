import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    // <Stack.Navigator initialRouteName="Login">
    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
    </Stack.Navigator>

  );
}
