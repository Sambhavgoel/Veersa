import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { sendEmergencyRequest } from '../../services/api';

const AmbulanceHomeScreen = ({navigation}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [status, setStatus] = useState('Status');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to pick a location.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setSelectedLocation({ latitude, longitude });
    })();
  }, []);

  const handleConfirmLocation = async () => {
    if (!selectedLocation) {
      Alert.alert('No Location Selected', 'Please select a location on the map.');
      return;
    }

    try {
      setLoading(true);
      await sendEmergencyRequest(123, {
        lat: selectedLocation.latitude,
        lng: selectedLocation.longitude,
      });
      setStatus('🚨 Emergency request sent!');
      Alert.alert("Success", "🚑 Ambulance is on the way!",
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('HomeScreen'), // 👈 navigate after alert
        },
      ]);
      // navigation.navigate("HomeScreen");
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send emergency request.');
      setStatus('❌ Failed to send request.');
    } finally {
      setLoading(false);
    }
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Pick Emergency Location</Text>

      {initialRegion ? (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          onPress={handleMapPress}
        >
          {selectedLocation && <Marker coordinate={selectedLocation} />}
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="#e53935" />
      )}

      <View style={styles.buttonContainer}>
        <Button
          title={loading ? 'Sending...' : 'Confirm Location & Send Request'}
          onPress={handleConfirmLocation}
          disabled={loading}
          color="#e53935"
        />
      </View>

      <Text style={styles.status}>{status}</Text>
    </View>
  );
};

export default AmbulanceHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    marginBottom:15,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 10,
  },
  map: {
    flex: 1,
  },
  status: {
    textAlign: 'center',
    margin: 10,
    fontSize: 16,
    paddingBottom: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
