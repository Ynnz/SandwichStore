import React, { useState, useEffect } from 'react';
import { getOrders, getSandwichById } from './config/api';  
import './HistoryOrders.css';

function HistoryOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [openOrderId, setOpenOrderId] = useState(null); // 追踪当前打开的订单ID

    const handleToggle = (orderId) => {
        // 点击时，切换当前打开的订单ID
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
                orders.map((order) => (
                    <div key={order._id}>
                        <div
                            className="order-item"
                            onClick={() => handleToggle(order._id)}
                        >
                            <h2>Order ID: {order._id}</h2>
                        </div>
                        {openOrderId === order._id && (
                            <div className="order-details">
                                <p>Status: {order.status}</p>
                                <ul>
                                    {order.sandwiches.map((sandwich) => (
                                        <li key={sandwich.id}>
                                            {sandwich.name} * {sandwich.quantity}
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