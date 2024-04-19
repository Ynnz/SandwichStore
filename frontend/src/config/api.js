const BASE_URL = 'http://localhost:3001/api';

export const getSandwiches = async () => {
  const response = await fetch(`${BASE_URL}/sandwich`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

export const addOrder = async (orderDetails) => {
  const response = await fetch(`${BASE_URL}/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderDetails)
  });
  const data = await response.json();
  return data;
};

export const getOrders = async () => {
  const response = await fetch(`${BASE_URL}/order`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

export const getOrderById = async (orderId) => {
  const response = await fetch(`${BASE_URL}/order/${orderId}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

export const getSandwichById = async (sandwichId) => {
  const response = await fetch(`${BASE_URL}/sandwich/${sandwichId}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};
