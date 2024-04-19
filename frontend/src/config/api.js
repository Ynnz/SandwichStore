/*
const BASE_URL = 'http://localhost:3001/api';

//TODO: Implement error handling. Currently app crashes if backend can't be reached
export const getSandwiches = async () => {
  const response = await fetch(`${BASE_URL}/sandwich`,{
    method: 'GET',
  });
  const data = await response.json();
  return data;
};
*/
const BASE_URL = 'http://localhost:3001/api';

// 获取所有三明治的数据
export const getSandwiches = async () => {
  const response = await fetch(`${BASE_URL}/sandwich`, {
    method: 'GET',
    /*headers: {
      'Content-Type': 'application/json'
    }*/
  });
  const data = await response.json();
  return data;
};

// 添加一个新的订单
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

// 获取所有订单的数据
export const getOrders = async () => {
  const response = await fetch(`${BASE_URL}/order`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
};

// 通过ID获取特定的订单
export const getOrderById = async (orderId) => {
  const response = await fetch(`${BASE_URL}/order/${orderId}`, {
    method: 'GET',
    /*headers: {
      'Content-Type': 'application/json'
    }*/
  });
  const data = await response.json();
  return data;
};

// 通过ID获取特定的三明治
export const getSandwichById = async (sandwichId) => {
  const response = await fetch(`${BASE_URL}/sandwich/${sandwichId}`, {
    method: 'GET',
    /*headers: {
      'Content-Type': 'application/json'
    }*/
  });
  const data = await response.json();
  return data;
};
