import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../components/LoginScreen';
import RegisterScreen from '../components/RegisterScreen';
import DoctorDashboard from '../components/DoctorDashboard';
import PatientDashboard from '../components/PatientDashboard';
// import HomeScreen from '../components/HomeScreen';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    // <Stack.Navigator initialRouteName="Login">
    // <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name="SplashScreen" component={SplashScreen} />
    //     <Stack.Screen name="HomeScreen" component={HomeScreen}/>
    // </Stack.Navigator>
    // <Stack.Navigator initialRouteName="Login">
    //     <Stack.Screen name="Login" component={LoginScreen} />
    //     <Stack.Screen name="Register" component={RegisterScreen} />
    //     <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />
    //     <Stack.Screen name="PatientDashboard" component={PatientDashboard} />
    //   </Stack.Navigator>
     <Stack.Navigator initialRouteName="HomeScreen">
         <Stack.Screen name="HomeScreen" component={HomeScreen} />
        
   </Stack.Navigator>
  );
}
