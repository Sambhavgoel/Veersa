// import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet } from 'react-native';
// import axios from 'axios';
// import LocationPicker from '../components/LocationPicker';

// const RegisterScreen = ({ navigation }) => {
//   const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient', location: '' });
//   const [registrationError, setRegistrationError] = useState('');

//   const register = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/register', form);

//       if (response.data && response.data.user) {
//         const { role } = response.data.user;
//         if (role === 'patient') {
//           navigation.navigate('PatientDashboard');
//         } else if (role === 'doctor') {
//           navigation.navigate('DoctorDashboard');
//         } else {
//           // Handle other roles or navigate to a default screen
//           navigation.navigate('Login');
//         }
//       } else {
//         // Handle cases where the registration was successful but user data is missing
//         navigation.navigate('Login');
//       }
//     } catch (error) {
//       console.error('Registration error:', error.response ? error.response.data : error.message);
//       setRegistrationError(error.response ? error.response.data.message || 'Registration failed' : 'Network error');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {registrationError ? <Text style={styles.errorText}>{registrationError}</Text> : null}
//       <TextInput placeholder="Name" value={form.name} onChangeText={val => setForm({ ...form, name: val })} style={styles.input} />
//       <TextInput placeholder="Email" value={form.email} onChangeText={val => setForm({ ...form, email: val })} style={styles.input} />
//       <TextInput placeholder="Password" value={form.password} secureTextEntry onChangeText={val => setForm({ ...form, password: val })} style={styles.input} />
//       <TextInput
//         placeholder="Role (doctor/patient)"
//         value={form.role}
//         onChangeText={val => setForm({ ...form, role: val.toLowerCase() })} // Ensure lowercase for comparison
//         style={styles.input}
//       />
//       <LocationPicker onLocationPicked={loc => setForm({ ...form, location: loc })} />
//       <Button title="Register" onPress={register} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20 },
//   input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
//   errorText: { color: 'red', marginBottom: 10 },
// });

// export default RegisterScreen;