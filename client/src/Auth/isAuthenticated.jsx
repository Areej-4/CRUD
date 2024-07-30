import axios from 'axios';

export const isAuthenticated = async () => {
  try {
    const response = await axios.get('http://localhost:3001/profile', { withCredentials: true });
    return response.status === 200;
  } catch (err) {
    return false;
  }
};

