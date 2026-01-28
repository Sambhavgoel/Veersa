import axios from 'axios';

// Use your local IP if you're on a real device (same Wi‑Fi as server).
export const BASE_URL = 'http://192.168.29.124:5000';

export const sendEmergencyRequest = async (userId, location) => {
  const response = await axios.post(`${BASE_URL}/api/request`, {
    userId,
    location
  });
  return response.data;
};

export const createAppointment = async ({ doctorId, patientId, date, time, mode }) => {
  const response = await axios.post(`${BASE_URL}/api/appointments`, {
    doctorId,
    patientId,
    date,
    time,
    mode,
  });
  return response.data;
};

export const listAppointmentsForUser = async (userId) => {
  const response = await axios.get(`${BASE_URL}/api/appointments/${userId}`);
  return response.data;
};