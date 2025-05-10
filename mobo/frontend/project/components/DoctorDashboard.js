
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
// import axios from 'axios';
// import WhatsAppButton from '../components/WhatsappButton';

// const DoctorDashboard = ({ route }) => {
//   const { user } = route.params;
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [mode, setMode] = useState('online');
//   const [appointments, setAppointments] = useState([]);

//   const addSlot = async () => {
//     const updatedSlots = [...user.availableSlots, { date, time, mode }];
//     await axios.put(`http://localhost:5000/api/auth/${user._id}/slots`, { availableSlots: updatedSlots });
//     user.availableSlots = updatedSlots;
//   };

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/appointments/doctor/${user._id}`)
//       .then(res => setAppointments(res.data));
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add Slot</Text>
//       <TextInput placeholder="Date" value={date} onChangeText={setDate} style={styles.input} />
//       <TextInput placeholder="Time" value={time} onChangeText={setTime} style={styles.input} />
//       <TextInput placeholder="Mode (online/offline)" value={mode} onChangeText={setMode} style={styles.input} />
//       <Button title="Add Slot" onPress={addSlot} />
//       <Text style={styles.title}>Appointments</Text>
//       <FlatList data={appointments} keyExtractor={item => item._id}
//         renderItem={({ item }) => (
//           <View>
//             <Text>{item.date} at {item.time} with patient {item.patientId}</Text>
//             <WhatsAppButton phone="+911234567890" message={`Reminder: Appointment on ${item.date} at ${item.time}`} />
//           </View>
//         )} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   input: { borderBottomWidth: 1, marginVertical: 8, padding: 8 },
//   title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 }
// });

// export default DoctorDashboard;
