import React, { useState, useEffect } from 'react';
import { getOrders, getSandwichById } from './config/api';  

function HistoryOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
        <div>
            <h1>History Orders</h1>
            {orders.length > 0 ? (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            <h2>Order ID: {order._id}</h2>
                            <p>Status: {order.status}</p>
                            <ul>
                                {order.sandwiches.map((sandwich) => (
                                    <li key={sandwich.id}>
                                        {sandwich.name} * {sandwich.quantity}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No history orders found.</p>
            )}
        </div>
    );
}

export default HistoryOrders;