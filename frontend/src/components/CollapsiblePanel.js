import React, { useState } from 'react';

const CollapsiblePanel = ({ orderId, status, sandwiches }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginBottom: '10px', border: '1px solid gray', borderRadius: '5px', padding: '10px' }}>
      <div style={{ cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
        <h2>Order ID: {orderId}</h2>
        <span>{isOpen ? '▼' : '▶'}</span>
      </div>
      {isOpen && (
        <div style={{ marginTop: '10px' }}>
          <p>Status: {status}</p>
          <ul>
            {sandwiches.map((sandwich) => (
              <li key={sandwich.id}>
                {sandwich.name} * {sandwich.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CollapsiblePanel;