import axios from 'axios';
import Constants from 'expo-constants';

const host = Constants.expoConfig.hostUri?.split(':').shift() || 'localhost';
export const BASE_URL = `http://${host}:5000`;

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
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

export const createAppointment = async (appointment) => {
  const response = await api.post('/appointments', appointment);
  return response.data;
};
