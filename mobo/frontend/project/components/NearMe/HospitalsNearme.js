// import React, { useEffect, useState, useRef } from 'react';
// import { View, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';
// import axios from 'axios';
// // 5811ae8e340c4bfbaf7a731454d4eb21
// const GEOAPIFY_API_KEY = '5811ae8e340c4bfbaf7a731454d4eb21';
// const GOOGLE_MAPS_API_KEY = '046aae6fa7f7435abc25fb3063587668';

// const HospitalsNearme = () => {
//   const [location, setLocation] = useState(null);
//   const [search, setSearch] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [hospitals, setHospitals] = useState([]);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         alert('Permission denied');
//         return;
//       }

//       let loc = await Location.getCurrentPositionAsync({});
//       setLocation(loc.coords);
//     })();
//   }, []);

//   const fetchSuggestions = async (text) => {
//     setSearch(text);
//     if (text.length < 3) return;
//     const res = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete`, {
//       params: {
//         text,
//         apiKey: GEOAPIFY_API_KEY,
//       },
//     });
//     setSuggestions(res.data.features);
//   };

//   const handleSuggestionPress = (place) => {
//     const coords = place.geometry.coordinates;
//     setLocation({ latitude: coords[1], longitude: coords[0] });
//     setSuggestions([]);
//   };

//   const searchHospitals = async () => {
//     if (!location) return;

//     const res = await axios.get(`https://api.geoapify.com/v2/places`, {
//       params: {
//         categories: 'healthcare.hospital',
//         filter: `circle:${location.longitude},${location.latitude},5000`,
//         bias: `proximity:${location.longitude},${location.latitude}`,
//         limit: 10,
//         apiKey: GEOAPIFY_API_KEY,
//       },
//     });

//     setHospitals(res.data.features);
//     if (mapRef.current) {
//       mapRef.current.animateToRegion({
//         latitude: location.latitude,
//         longitude: location.longitude,
//         latitudeDelta: 0.05,
//         longitudeDelta: 0.05,
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Search location..."
//         value={search}
//         onChangeText={fetchSuggestions}
//         style={styles.input}
//       />
//       {suggestions.length > 0 && (
//         <FlatList
//           data={suggestions}
//           keyExtractor={(item) => item.properties.place_id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               onPress={() => handleSuggestionPress(item)}
//               style={styles.suggestion}
//             >
//               <Text>{item.properties.formatted}</Text>
//             </TouchableOpacity>
//           )}
//           style={styles.suggestionBox}
//         />
//       )}

//       <Button title="Search Hospitals Nearby" onPress={searchHospitals} />

//       {location && (
//         <MapView
//           ref={mapRef}
//           style={styles.map}
//           initialRegion={{
//             latitude: location.latitude,
//             longitude: location.longitude,
//             latitudeDelta: 0.05,
//             longitudeDelta: 0.05,
//           }}
//         >
//           <Marker
//             coordinate={location}
//             title="You are here"
//             pinColor="blue"
//           />

//           {hospitals.map((hospital) => (
//             <Marker
//               key={hospital.properties.place_id}
//               coordinate={{
//                 latitude: hospital.geometry.coordinates[1],
//                 longitude: hospital.geometry.coordinates[0],
//               }}
//               title={hospital.properties.name}
//               description={hospital.properties.address_line1}
//             />
//           ))}
//         </MapView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 10 },
//   input: {
//     backgroundColor: '#fff',
//     padding: 10,
//     marginBottom: 5,
//     borderRadius: 8,
//     borderColor: '#ccc',
//     borderWidth: 1,
//   },
//   suggestionBox: {
//     maxHeight: 150,
//     backgroundColor: '#fff',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 5,
//   },
//   suggestion: {
//     padding: 10,
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//   },
//   map: { flex: 1, marginTop: 10 },
// });

// export default HospitalsNearme;
