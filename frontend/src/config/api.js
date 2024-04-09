import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api'; // replace with your server's address

export const getSandwiches = async () => {
  const response = await axios.get(`${BASE_URL}/sandwich`);
  return response.data;
};

// all the other functions also come here as their separate exports