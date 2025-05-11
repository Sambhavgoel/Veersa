import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// import PushNotification from 'react-native-push-notification';
// PushNotification.configure({
//   onNotification: function (notification) {
//     console.log("NOTIFICATION:", notification);
//   },
//   requestPermissions: Platform.OS === 'ios',
// });


export default function App() {
  
  return (

    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
