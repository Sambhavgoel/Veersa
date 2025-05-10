// import React from 'react';
// import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
// import { mockDatabase } from '../utils/database';

// export default function DashboardScreen({ route, navigation }) {
//   const { user } = route.params;
//   const userAppointments = mockDatabase.appointments.filter(app => app.email === user.email);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome, {user.email}</Text>
//       <Button title="Book Appointment" onPress={() => navigation.navigate('Appointment', { user })} />
//       <Text style={styles.subtitle}>Your Appointments:</Text>
//       <FlatList
//         data={userAppointments}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.appointmentItem}>
//             <Text>Date: {new Date(item.dateTime).toLocaleString()}</Text>
//             <Text>Mode: {item.mode}</Text>
//             <Text>Location: {item.location}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
//   subtitle: { marginVertical: 10, fontWeight: 'bold' },
//   appointmentItem: { marginBottom: 10 },
// });
