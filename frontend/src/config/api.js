const BASE_URL = 'http://localhost:3001/api';

//TODO: Implement error handling. Currently app crashes if backend can't be reached
export const getSandwiches = async () => {
  const response = await fetch(`${BASE_URL}/sandwich`,{
    method: 'GET',
  });
  const data = await response.json();
  return data;
};