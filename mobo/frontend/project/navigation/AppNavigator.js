import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import AmbulanceHomeScreen from '../components/Ambulance/AmbulanceHomeScreen'
import DoctorCategoryPage from '../components/DoctorCategoryPage/DoctorCategoryPage'
import CardiologistPage from '../components/DoctorCategoryPage/CardiologistPage'
import ScheduleComponent from '../components/ScheduleComponent/ScheduleComponent'
import RazorpayWebViewPayment from '../components/ScheduleComponent/RazorpayWebViewPayment'
import Reminder from '../components/Reminder/Reminder'
// import HospitalsNearme from '../components/NearMe/HospitalsNearme'

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="AmbulanceHomeScreen" component={AmbulanceHomeScreen}/>
        <Stack.Screen name="DoctorCategoryPage" component={DoctorCategoryPage}/>
        <Stack.Screen name="CardiologistPage" component={CardiologistPage}/>
        <Stack.Screen name="ScheduleComponent" component={ScheduleComponent}/>
        <Stack.Screen name="RazorpayWebViewPayment" component={RazorpayWebViewPayment}/>
        <Stack.Screen name="Reminder" component={Reminder}/>
        {/* <Stack.Scree name="HospitalsNearme" component={HospitalsNearme}/> */}




    </Stack.Navigator>
  );
}
