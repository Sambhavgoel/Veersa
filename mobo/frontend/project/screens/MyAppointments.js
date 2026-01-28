import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { listAppointmentsForUser } from '../services/api';

const MyAppointments = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  const load = async () => {
    try {
      setLoading(true);
      const stored = await AsyncStorage.getItem('currentUser');
      const currentUser = stored ? JSON.parse(stored) : null;
      const userId = currentUser?.id;

      if (!userId) {
        Alert.alert('Login required', 'Please login to view your appointments.');
        navigation.navigate('Login');
        return;
      }

      const data = await listAppointmentsForUser(userId);
      setAppointments(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Failed to load appointments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', load);
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading appointments…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Appointments</Text>
        <TouchableOpacity style={styles.refreshBtn} onPress={load}>
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      {appointments.length === 0 ? (
        <View style={styles.center}>
          <Text>No appointments yet.</Text>
        </View>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item, idx) => String(item?._id || idx)}
          contentContainerStyle={{ paddingBottom: 16 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.status || 'scheduled'}</Text>
              <Text style={styles.row}>Date: {item.date}</Text>
              <Text style={styles.row}>Time: {item.time}</Text>
              <Text style={styles.row}>Mode: {item.mode}</Text>
              <Text style={styles.muted}>DoctorId: {String(item.doctorId)}</Text>
              <Text style={styles.muted}>PatientId: {String(item.patientId)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 16, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  refreshBtn: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#111', borderRadius: 8 },
  refreshText: { color: '#fff', fontWeight: '600' },
  card: { borderWidth: 1, borderColor: '#e6e6e6', padding: 12, borderRadius: 12, marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  row: { fontSize: 14, marginBottom: 2 },
  muted: { fontSize: 12, color: '#666' },
});

export default MyAppointments;

