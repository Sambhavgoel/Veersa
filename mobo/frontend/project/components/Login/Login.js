import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const Login = ({ navigation }) => {
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('patient');
  const [location, setLocation] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    number: '',
    degree: '',
    experience: '',
    password: '',
    address: '', // <- Add address field
  });

  useEffect(() => {
    if (mode === 'signup') {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission denied', 'Location access is needed.');
        }
      })();
    }
  }, [mode]);

  const handleChange = async (field, value) => {
    setFormData({ ...formData, [field]: value });

    // Geocode address to lat/lng
    if (field === 'address') {
      try {
        const geocode = await Location.geocodeAsync(value);
        if (geocode.length > 0) {
          setLocation({
            latitude: geocode[0].latitude,
            longitude: geocode[0].longitude,
          });
        }
      } catch (error) {
        console.error('Geocoding failed:', error);
        Alert.alert('Invalid address', 'Unable to locate the address on map.');
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const endpoint = `http://192.168.38.201:5000/api/users/${mode}`;

      if (mode === 'signup' && !location) {
        Alert.alert('Error', 'Please enter a valid address to fetch location.');
        return;
      }

      const data = {
        ...formData,
        role,
        ...(mode === 'signup' ? {
          location: {
            latitude: location.latitude,
            longitude: location.longitude,
          }
        } : {})
      };

      const res = await axios.post(endpoint, data);
      Alert.alert('Success', res.data.message || `${mode} successful`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('HomeScreen'), // 👈 navigate after alert
        },
      ]);

    //   navigation.navigate("HomeScreen");
    } catch (err) {
      console.error(err);
      Alert.alert('Error', err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🚑 {mode === 'login' ? 'Login' : 'Signup'} as {role}</Text>

      <Picker selectedValue={mode} onValueChange={value => setMode(value)} style={styles.picker}>
        <Picker.Item label="Login" value="login" />
        <Picker.Item label="Signup" value="signup" />
      </Picker>

      <Picker selectedValue={role} onValueChange={value => setRole(value)} style={styles.picker}>
        <Picker.Item label="Patient" value="patient" />
        <Picker.Item label="Doctor" value="doctor" />
      </Picker>

      {mode === 'signup' && (
        <>
          <TextInput style={styles.input} placeholder="Name" onChangeText={val => handleChange('name', val)} />
          <TextInput style={styles.input} placeholder="Age" keyboardType="numeric" onChangeText={val => handleChange('age', val)} />
          <TextInput
            style={styles.input}
            placeholder="Address"
            onChangeText={val => handleChange('address', val)}
          />
          {location && (
            <MapView
              style={styles.map}
              region={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <Marker coordinate={location} />
            </MapView>
          )}
          {role === 'doctor' && (
            <>
              <TextInput style={styles.input} placeholder="Degree" onChangeText={val => handleChange('degree', val)} />
              <TextInput style={styles.input} placeholder="Experience" onChangeText={val => handleChange('experience', val)} />
            </>
          )}
        </>
      )}

      <TextInput style={styles.input} placeholder="Email" onChangeText={val => handleChange('email', val)} />
      <TextInput style={styles.input} placeholder="Phone Number" onChangeText={val => handleChange('number', val)} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={val => handleChange('password', val)} />

      <Button title={mode === 'login' ? 'Login' : 'Signup'} onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    
  container: {
  flexGrow: 1,
  padding: 20,
  paddingBottom: 40, // gives bottom space for scroll
},

  title: { fontSize: 22, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10, borderRadius: 5 },
  picker: { marginBottom: 20 },
  map: { height: 200, marginBottom: 20 },
});

export default Login;