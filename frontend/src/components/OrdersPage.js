import React from 'react';
import './OrdersPage.css';

const OrdersPage = () => {
  return (
    <div className="orders-page">
      <h2>Order history</h2>
      {/* Render order history */}
      <div className="order-item">
        <span>Order #00001</span>
        <span>vegan sandwich x 1</span>
        <strong>Total: €2.2</strong>
      </div>
      {/* ... more orders */}
    </div>
  );
};

export default OrdersPage;
