
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import axios from 'axios';

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
//       const { user } = res.data;
//       navigation.navigate(user.role === 'doctor' ? 'DoctorDashboard' : 'PatientDashboard', { user });
//     } catch (err) {
//       Alert.alert('Login Failed', err.response?.data?.message || 'Error');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
//       <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
//       <Button title="Login" onPress={handleLogin} />
//       <Button title="Register" onPress={() => navigation.navigate('Register')} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20 },
//   input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 }
// });

// export default LoginScreen;
