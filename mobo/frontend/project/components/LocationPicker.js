// import React, { useEffect, useState } from 'react';
// import * as Location from 'expo-location';
// import { Text, Button } from 'react-native';

// const LocationPicker = ({ onLocationPicked }) => {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         alert('Permission denied');
//         return;
//       }
//       let loc = await Location.getCurrentPositionAsync({});
//       setLocation(loc.coords);
//       onLocationPicked(`${loc.coords.latitude},${loc.coords.longitude}`);
//     })();
//   }, []);

//   return <Text>Location: {location ? `${location.latitude}, ${location.longitude}` : 'Fetching...'}</Text>;
// };

// export default LocationPicker;