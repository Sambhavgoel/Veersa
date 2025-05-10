import axios from 'axios';

// Use the correct base URL depending on the environment
// For Android emulator, it's 'http://10.0.2.2:5000'
const BASE_URL = 'http://10.0.2.2:5000/api'; // Replace with your local IP for physical devices

// Function to send emergency request
export const sendEmergencyRequest = async (userId, location) => {
  try {
    const response = await axios.post(`${BASE_URL}/request`, {
      userId,
      location,
    });
    return response.data; // Return response data for further handling in your component
  } catch (error) {
    console.error("Error sending emergency request:", error);
    throw error; // Rethrow the error to be handled by the calling component
  }
};
