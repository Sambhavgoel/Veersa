// import React, { useEffect } from 'react';
// import { Alert } from 'react-native';

// const AppointmentReminder = ({ appointment }) => {
//   useEffect(() => {
//     const apptTime = new Date(`${appointment.date}T${appointment.time}`);
//     const now = new Date();
//     const diff = apptTime - now - 3600000; // 1 hour in ms

//     if (diff > 0) {
//       const timer = setTimeout(() => {
//         Alert.alert('Appointment Reminder', `Upcoming appointment at ${appointment.time} on ${appointment.date}`);
//       }, diff);

//       return () => clearTimeout(timer);
//     }
//   }, [appointment]);

//   return null;
// };

// export default AppointmentReminder;