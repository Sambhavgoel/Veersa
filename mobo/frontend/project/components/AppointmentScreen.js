// import React, { useState } from 'react';
// import {
//   View, Text, Button, Switch, Alert, Linking
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import PushNotification from 'react-native-push-notification';
// import DateTimePicker from '@react-native-community/datetimepicker';

// export default function AppointmentBookingScreen() {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet, Alert } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import * as Location from 'expo-location';
// import RazorpayCheckout from 'react-native-razorpay';
// import Reminder from '../components/Reminder';
// import { mockDatabase } from '../utils/database';

// export default function AppointmentScreen({ route, navigation }) {
//   const { user } = route.params;
//   const [date, setDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);
//   const [mode, setMode] = useState('online');
//   const [location, setLocation] = useState('');

//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission denied', 'Location access is required.');
//         return;
//       }
//       const loc = await Location.getCurrentPositionAsync({});
//       setLocation(`Lat: ${loc.coords.latitude}, Lon: ${loc.coords.longitude}`);
//     })();
//   }, []);

//   const handleConfirm = async () => {
//     const options = {
//       description: 'Appointment Booking Fee',
//       currency: 'INR',
//       key: 'YOUR_RAZORPAY_KEY_ID',
//       amount: '50000',
//       name: 'DoctorApp',
//       prefill: {
//         email: user.email,
//         contact: '9999999999',
//         name: 'Patient Name'
//       },
//       theme: { color: '#53a20e' }
//     };

//     RazorpayCheckout.open(options).then(() => {
//       const appointment = {
//         email: user.email,
//         dateTime: date.toISOString(),
//         mode,
//         location: mode === 'offline' ? location : 'Online'
//       };
//       mockDatabase.appointments.push(appointment);
//       Alert.alert('Success', 'Payment successful and appointment booked');
//       navigation.navigate('Dashboard', { user });
//     }).catch((error) => {
//       Alert.alert('Payment Failed', error.description);
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Book Appointment</Text>
//       <Button title="Pick Date & Time" onPress={() => setShowPicker(true)} />
//       {showPicker && (
//         <DateTimePicker
//           value={date}
//           mode="datetime"
//           display="default"
//           onChange={(e, selectedDate) => {
//             setShowPicker(false);
//             if (selectedDate) setDate(selectedDate);
//           }}
//         />
//       )}
//       <Text style={styles.info}>{mode === 'online' ? 'Mode: Online' : `Mode: Offline at ${location}`}</Text>
//       <Button title={mode === 'online' ? 'Switch to Offline' : 'Switch to Online'} onPress={() => setMode(mode === 'online' ? 'offline' : 'online')} />
//       <Reminder appointment={{ dateTime: date }} />
//       <Button title="Pay & Confirm" onPress={handleConfirm} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20 },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
//   info: { marginVertical: 10 },
// });
// selectedSlot, setSelectedSlot] = useState(null);
//   const [emergency, setEmergency] = useState(false);
//   const [isOnline, setIsOnline] = useState(true);
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const doctorWhatsApp = '+911234567890';

//   const doctorTimeSlots = [
//     '10:00 AM',
//     '11:30 AM',
//     '2:00 PM',
//     '4:00 PM',
//     '6:00 PM'
//   ];

//   const handleDateChange = (event, date) => {
//     if (date && date >= new Date().setHours(0, 0, 0, 0)) {
//       setSelectedDate(date);
//     } else {
//       Alert.alert('Invalid', 'Cannot select a past date.');
//     }
//     setShowDatePicker(false);
//   };

//   const parseSlotToDate = (slotStr, dateObj) => {
//     const [time, meridiem] = slotStr.split(' ');
//     let [hours, minutes] = time.split(':').map(Number);
//     if (meridiem === 'PM' && hours < 12) hours += 12;
//     if (meridiem === 'AM' && hours === 12) hours = 0;
//     const newDate = new Date(dateObj);
//     newDate.setHours(hours);
//     newDate.setMinutes(minutes);
//     newDate.setSeconds(0);
//     return newDate;
//   };

//   const scheduleReminder = (appointmentTime) => {
//     const reminderTime = new Date(appointmentTime.getTime() - 60 * 60 * 1000);
//     PushNotification.localNotificationSchedule({
//       message: "⏰ Reminder: Your appointment is in 1 hour!",
//       date: reminderTime,
//       allowWhileIdle: true,
//       channelId: 'appointment-reminder',
//     });
//   };

//   const saveAppointment = async () => {
//     const appointmentTime = parseSlotToDate(selectedSlot, selectedDate);

//     const data = {
//       patientId: 'xyz',
//       doctorId: 'abc',
//       date: selectedDate.toDateString(),
//       timeSlot: selectedSlot,
//       fullDateTime: appointmentTime.toISOString(),
//       isOnline,
//       emergency
//     };

//     try {
//       const existing = await AsyncStorage.getItem('appointments');
//       const parsed = existing ? JSON.parse(existing) : [];
//       parsed.push(data);
//       await AsyncStorage.setItem('appointments', JSON.stringify(parsed));

//       scheduleReminder(appointmentTime);
//       Alert.alert('Success', 'Appointment booked and reminder set!');
//       setIsConfirmed(false);
//       setSelectedSlot(null);
//     } catch (error) {
//       console.error('Failed to save appointment:', error);
//     }
//   };

//   const openWhatsApp = () => {
//     const url = `whatsapp://send?phone=${doctorWhatsApp}&text=Hello Doctor`;
//     Linking.openURL(url).catch(() =>
//       Alert.alert('Error', 'WhatsApp not available on this device')
//     );
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ marginBottom: 10 }}>📅 Select Appointment Date:</Text>
//       <Button
//         title={selectedDate.toDateString()}
//         onPress={() => setShowDatePicker(true)}
//       />
//       {showDatePicker && (
//         <DateTimePicker
//           value={selectedDate}
//           mode="date"
//           display="default"
//           minimumDate={new Date()}
//           onChange={handleDateChange}
//         />
//       )}

//       <Text style={{ marginTop: 20 }}>🕒 Choose Time Slot:</Text>
//       {doctorTimeSlots.map((slot, idx) => (
//         <Button
//           key={idx}
//           title={slot}
//           onPress={() => {
//             setSelectedSlot(slot);
//             setIsConfirmed(false); // Reset confirmation
//           }}
//           color={selectedSlot === slot ? 'green' : undefined}
//         />
//       ))}

//       <Text style={{ marginTop: 20 }}>🚨 Emergency:</Text>
//       <Switch value={emergency} onValueChange={setEmergency} />

//       <Text style={{ marginTop: 20 }}>📡 Online Meeting:</Text>
//       <Switch value={isOnline} onValueChange={setIsOnline} />

//       {isOnline && (
//         <Button
//           title="💬 Chat on WhatsApp"
//           onPress={openWhatsApp}
//           color="#25D366"
//         />
//       )}

//       <View style={{ marginTop: 30 }}>
//         <Button
//           title="✅ Confirm Appointment Details"
//           onPress={() => {
//             if (!selectedSlot) {
//               Alert.alert('Please select a time slot.');
//               return;
//             }
//             setIsConfirmed(true);
//           }}
//           color="blue"
//         />
//       </View>

//       {isConfirmed && (
//         <View style={{ marginTop: 20 }}>
//           <Button
//             title="💳 Pay & Book Appointment"
//             onPress={saveAppointment}
//             color="green"
//           />
//         </View>
//       )}
//     </View>
//   );
// }
