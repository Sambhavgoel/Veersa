import axios from 'axios';

const BASE_URL = 'http://192.168.38.201:5000'; // use your local IP if you're on a real device

export const sendEmergencyRequest = async (userId, location) => {
  const response = await axios.post(`${BASE_URL}/api/request`, {
    userId,
    location
  });
  return response.data;
};