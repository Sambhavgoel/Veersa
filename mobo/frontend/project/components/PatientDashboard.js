
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
// import axios from 'axios';
// import WhatsAppButton from '../components/WhatsappButton';

// const PatientDashboard = ({ route }) => {
//   const { user } = route.params;
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [mode, setMode] = useState('online');

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/auth/doctors').then(res => setDoctors(res.data));
//   }, []);

//   const bookAppointment = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/appointments/book', {
//         doctorId: selectedDoctor._id,
//         patientId: user._id,
//         date,
//         time,
//         mode
//       });
//       Alert.alert('Success', 'Appointment booked!');
//     } catch (err) {
//       Alert.alert('Error', 'Booking failed');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Select Doctor</Text>
//       <FlatList data={doctors} keyExtractor={item => item._id} renderItem={({ item }) => (
//         <Button title={item.name} onPress={() => setSelectedDoctor(item)} />
//       )} />
//       {selectedDoctor && (
//         <View>
//           <Text>Selected: {selectedDoctor.name}</Text>
//           <TextInput placeholder="Date" value={date} onChangeText={setDate} style={styles.input} />
//           <TextInput placeholder="Time" value={time} onChangeText={setTime} style={styles.input} />
//           <TextInput placeholder="Mode (online/offline)" value={mode} onChangeText={setMode} style={styles.input} />
//           <Button title="Book Appointment" onPress={bookAppointment} />
//           <WhatsAppButton phone="+911234567890" message={`Appointment booked with ${selectedDoctor.name} on ${date} at ${time}`} />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   input: { borderBottomWidth: 1, marginVertical: 8, padding: 8 },
//   title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 }
// });

// export default PatientDashboard;
