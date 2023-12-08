import axios from 'axios';

const BASE_URL = 'https://9ee4-202-47-35-196.ngrok-free.app';

export const verifyDevice = async (deviceId) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/device/verify`, {
      deviceId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/email/verify`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkInOut = async (deviceId) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/user/check`, {
        deviceId,
      });
    return response.data;
  } catch (error) {
    throw error;
  }
};
