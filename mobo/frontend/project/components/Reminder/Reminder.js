import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// Configure how notifications are handled when received
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Sample appointment data
const appointmentData = [
  {
    id: '1',
    name: 'Dr. Smith',
    date: '2025-05-11', // YYYY-MM-DD
    time: '12:21',       // HH:MM in 24-hour format
    Latitudes: 28.4089,
    Longitudes: 77.3178,
    Latituded: 28.6588,
    Longituded: 77.2167,
  },
  {
    id: '2',
    name: 'Dr. Jones',
    date: '2025-05-12',
    time: '10:00',
    Latitudes: 28.4089,
    Longitudes: 77.3178,
    Latituded: 28.6588,
    Longituded: 77.2167,
  },
];

const Reminder = () => {
  const [permissionStatus, setPermissionStatus] = useState(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((status) => {
      setPermissionStatus(status);
      if (status === 'granted') {
        scheduleAllReminders();
      }
    });

    // Listen when notifications arrive
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification Received:', notification);
    });

    return () => subscription.remove();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    if (!Device.isDevice) {
      Alert.alert('Error', 'Push notifications require a physical device.');
      return 'denied';
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permission denied', 'Notification permissions not granted.');
    }

    return finalStatus;
  };

  const scheduleAllReminders = async () => {
    for (const appointment of appointmentData) {
      const [hours, minutes] = appointment.time.split(':').map(Number);
      const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}:00`);
      const reminderTime = new Date(appointmentDateTime.getTime() - 60 * 60 * 1000); // 1 hour before

      const now = new Date();
      if (reminderTime > now) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Appointment Reminder!',
            body: `You have an appointment with ${appointment.name} at ${appointment.time} at ${appointment.locationName}.`,
            sound: 'default',
            channelId: 'default',
          },
          trigger: reminderTime,
        });

        console.log(`✅ Scheduled reminder for ${appointment.name} at ${reminderTime.toLocaleString()}`);
      } else {
        console.log(`⚠️ Skipped ${appointment.name} — Reminder time already passed.`);
      }
    }
  };

  const handleDirectionPress = (LAT1,LNG1,LAT2,LNG2) => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${LAT1},${LNG1}&destination=${LAT2},${LNG2}`).catch((err) => console.error('Error opening directions:', err));
  };

  const renderItem = ({ item }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>Date: {item.date}</Text>
      <Text>Time: {item.time}</Text>
      <TouchableOpacity style={styles.directionButton} onPress={() => handleDirectionPress(item.Latitudes,item.Longitudes,item.Latituded,item.Longituded)}>
        <Text style={styles.directionText}>Direction</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Appointment</Text>
      <FlatList
        data={appointmentData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
    marginTop:50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  appointmentItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  directionButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  directionText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Reminder;
