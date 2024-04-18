import React, { useState } from 'react';
import { addOrder } from './config/api';  // Adjust path as necessary

function OrderForm() {
  const [order, setOrder] = useState({ sandwiches: [{ id: '', quantity: 1 }], status: 'ordered' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await addOrder(order);
      alert('Order placed! Order ID: ' + result._id);
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Sandwich ID:
        <input type="text" value={order.sandwiches[0].id} onChange={(e) => setOrder({...order, sandwiches: [{...order.sandwiches[0], id: e.target.value}]})} />
      </label>
      <label>
        Quantity:
        <input type="number" value={order.sandwiches[0].quantity} onChange={(e) => setOrder({...order, sandwiches: [{...order.sandwiches[0], quantity: Number(e.target.value)}]})} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default OrderForm;