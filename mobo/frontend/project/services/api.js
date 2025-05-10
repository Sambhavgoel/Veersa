import axios from 'axios';

const BASE_URL = 'http://192.168.56.1:5000/api'; // Replace with YOUR IP

export const sendEmergencyRequest = async (userId, location) => {
  try {
    const response = await axios.post(`${BASE_URL}/request`, {
      userId,
      location,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending emergency request:', error);
    throw error;
  }
};
