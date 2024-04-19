import React, { useState } from 'react';
import { getOrderById, getSandwichById } from './config/api';  // 确保路径正确

function OrderStatus() {
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [sandwichesDetails, setSandwichesDetails] = useState([]);

  const fetchOrder = async () => {
    try {
      const result = await getOrderById(orderId);
      setOrderDetails(result);
      // 获取所有三明治的详细信息
      const sandwichesInfo = await Promise.all(
        result.sandwiches.map(sandwich => getSandwichById(sandwich.id))
      );
      setSandwichesDetails(sandwichesInfo);
    } catch (error) {
      console.error('Failed to fetch order:', error);
      alert('Failed to fetch order.');
      setOrderDetails(null);
      setSandwichesDetails([]);
    }
  };

  return (
    <div>
      <label>
        Order ID:
        <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
      </label>
      <button onClick={fetchOrder}>Check Status</button>
      {orderDetails && <div>
        <h3>Order Status: {orderDetails.status}</h3>
        {sandwichesDetails.map((sandwich, index) => (
          <div key={sandwich.id}>
            <p>{sandwich.name} * {orderDetails.sandwiches[0].quantity}</p>
          </div>
        ))}
      </div>}
    </div>
  );
}

export default OrderStatus;
