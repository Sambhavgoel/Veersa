import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapAddressPicker = ({ onLocationSelect }) => {
  const [region, setRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      onLocationSelect({ latitude, longitude });
    })();
  }, []);

  const handleMapPress = (e) => {
    const coords = e.nativeEvent.coordinate;
    setRegion({
      ...region,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    onLocationSelect(coords);
  };

  if (!region) return <Text>Loading map...</Text>;

  return (
    <MapView style={styles.map} region={region} onPress={handleMapPress}>
      <Marker coordinate={region} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
    width: '100%',
    marginBottom: 20,
  },
});

export default MapAddressPicker;