import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const GEOAPIFY_API_KEY = '5811ae8e340c4bfbaf7a731454d4eb21';

const HospitalsNearme = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required to find nearby hospitals.');
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      fetchNearbyHospitals(loc.coords.latitude, loc.coords.longitude);
    })();
  }, []);

  const fetchNearbyHospitals = async (latitude, longitude) => {
    const buffer = 0.05;
    const left = longitude - buffer;
    const bottom = latitude - buffer;
    const right = longitude + buffer;
    const top = latitude + buffer;
    const boundingBox = `${left},${bottom},${right},${top}`;

    const apiUrl = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=rect:${boundingBox}&limit=10&apiKey=${GEOAPIFY_API_KEY}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const nearby = data.features.map((feature) => ({
          id: feature.properties.place_id,
          name: feature.properties.name || 'Unnamed Hospital',
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0],
        }));
        setHospitals(nearby);
      } else {
        Alert.alert('No Hospitals Found', 'Could not find nearby hospitals.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch hospital data.');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !location) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Finding nearby hospitals...</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.header}>hospitals near me</Text>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={true}
        >
          {hospitals.map((hospital) => (
            <Marker
              key={hospital.id}
              coordinate={{ latitude: hospital.lat, longitude: hospital.lng }}
              title={hospital.name}
              description="Hospital"
              pinColor="red"
            />
          ))}
        </MapView>
      </View>

      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {hospitals.map((hospital) => (
            <Text key={hospital.id} style={styles.hospitalItem}>
              • {hospital.name}
            </Text>
          ))}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>hospital found : {hospitals.length}</Text>
      </View>
    </View>
  );
};

export default HospitalsNearme;

const styles = StyleSheet.create({
  card: {
    marginVertical: 50,
    marginHorizontal: 10,
    // borderWidth: 2,
    // borderColor: '#000',
    borderRadius: 20,
    // padding: 15,
    flex: 1,
    // backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Cochin',
  },
  mapContainer: {
    height: 400,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 15,
  },
  map: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  hospitalItem: {
    fontSize: 16,
    marginBottom: 8,
  },
  footer: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
