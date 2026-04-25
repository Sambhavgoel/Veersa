import axios from 'axios';
import Constants from 'expo-constants';

const host = Constants.expoConfig.hostUri?.split(':').shift() || 'localhost';

const api = axios.create({
  baseURL: `http://${host}:5000/api`, // Added /api here to shorten calls
});

export const sendEmergencyRequest = async (userId, location) => {
  // No need to use ${BASE_URL} anymore!
  const response = await api.post('/request', { userId, location });
  return response.data;
};

export const listAppointmentsForUser = async (userId) => {
  const response = await api.get(`/appointments/${userId}`);
  return response.data;
};