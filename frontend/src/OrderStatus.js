import React, { useState } from 'react';
import { getOrderById } from './config/api';  // Adjust path as necessary

function OrderStatus() {
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);

  const fetchOrder = async () => {
    try {
      const result = await getOrderById(orderId);
      setOrderDetails(result);
    } catch (error) {
      console.error('Failed to fetch order:', error);
      alert('Failed to fetch order.');
      setOrderDetails(null);
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
        <p>Sandwich ID: {orderDetails.sandwiches[0].id}</p>

        {/* Render more details as needed */}
      </div>}
    </div>
  );
}

export default OrderStatus;
