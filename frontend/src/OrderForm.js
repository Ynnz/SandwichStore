import React, { useState } from 'react';
import { addOrder } from './config/api';  // 确保路径根据您的项目结构正确

const OrderForm = () => {
    const [orderId, setOrderId] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const orderDetails = {
            sandwiches: [
                { id: orderId, quantity: parseInt(quantity, 10) }
            ],
            status: 'ordered'  // 这可以根据您的应用需求动态设置
        };

        try {
            const response = await addOrder(orderDetails);
            console.log('Order response:', response);
            alert('Order placed successfully!');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Sandwich ID:</label>
                <input
                    type="text"
                    value={orderId}
                    onChange={e => setOrderId(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Place Order</button>
        </form>
    );
};

export default OrderForm;
