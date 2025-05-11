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
import HospitalsNearme from '../components/NearMe/HospitalsNearme'
import DoctorsNearme from '../components/NearMe/DoctorsNearme'
import Whatsapp from '../components/DoctorCategoryPage/Whatsapp'
import DentistPage from '../components/DoctorCategoryPage/DentistPage'
import DermatologistPage from '../components/DoctorCategoryPage/DermatologistPage'
import OrthopedicPage from '../components/DoctorCategoryPage/OrthopedicPage'
import PediatricianPage from '../components/DoctorCategoryPage/PediatricianPage'
import PsychiatristPage from '../components/DoctorCategoryPage/PsychiatristPage'
import Login from '../components/Login/Login'
// import MapAddressPicker from '../components/Login/MapAddressPicker';
import Contact from '../components/Contact/Contact';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="AmbulanceHomeScreen" component={AmbulanceHomeScreen}/>
        <Stack.Screen name="DoctorCategoryPage" component={DoctorCategoryPage}/>

        <Stack.Screen name="DermatologistPage" component={DermatologistPage}/>
        <Stack.Screen name="DentistPage" component={DentistPage}/>
        <Stack.Screen name="OrthopedicPage" component={OrthopedicPage}/>
        <Stack.Screen name="PsychiatristPage" component={PsychiatristPage}/>
        <Stack.Screen name="PediatricianPage" component={PediatricianPage}/>
        <Stack.Screen name="CardiologistPage" component={CardiologistPage}/>

        <Stack.Screen name="ScheduleComponent" component={ScheduleComponent}/>
        <Stack.Screen name="RazorpayWebViewPayment" component={RazorpayWebViewPayment}/>
        <Stack.Screen name="Reminder" component={Reminder}/>
        <Stack.Screen name="HospitalsNearme" component={HospitalsNearme}/>
        <Stack.Screen name="DoctorsNearme" component={DoctorsNearme}/>
        <Stack.Screen name="Whatsapp" component={Whatsapp}/>

        <Stack.Screen name="Login" component={Login}/>
        {/* <Stack.Screen name="MapAddressPicker" component={MapAddressPicker}/> */}
        <Stack.Screen name="Contact" component={Contact}/>
   


    </Stack.Navigator>
  );
}
