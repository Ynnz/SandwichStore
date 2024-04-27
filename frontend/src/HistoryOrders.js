import React, { useState, useEffect } from 'react';
import { getOrders, getSandwichById } from './config/api';  
import './HistoryOrders.css';

function HistoryOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [openOrderId, setOpenOrderId] = useState(null); 

    const handleToggle = (orderId) => {
        setOpenOrderId(prevOpenOrderId => prevOpenOrderId === orderId ? null : orderId);
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const fetchedOrders = await getOrders();
                const ordersWithDetails = await Promise.all(fetchedOrders.map(async (order) => {
                    const sandwiches = await Promise.all(order.sandwiches.map(async (sandwich) => {
                        const sandwichDetails = await getSandwichById(sandwich.id);
                        return { ...sandwich, name: sandwichDetails.name };
                    }));
                    return { ...order, sandwiches };
                }));
                setOrders(ordersWithDetails);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch orders: ' + err.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="history-orders">
        <h1>History Orders</h1>
        {orders.length > 0 ? (
          [...orders].reverse().map((order) => (
            <div key={order._id}>
              <div
                className="order-item"
                onClick={() => handleToggle(order._id)}
              >
                <h2>
                  Order {order._id} ({order.sandwiches.reduce((acc, sandwich) => acc + sandwich.quantity, 0)} items)
                </h2>
              </div>
              {openOrderId === order._id && (
                <div className="order-details">
                  <p>Status: {order.status}</p>
                  <p class="order-contains">Order contains:</p>
                  <ul>
                    {order.sandwiches.map((sandwich) => (
                      <li key={sandwich.id}>
                        {sandwich.name} ({sandwich.quantity} pcs)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No history orders found.</p>
        )}
      </div>
    );
}

export default HistoryOrders;