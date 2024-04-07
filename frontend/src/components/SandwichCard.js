import React from 'react';
import './SandwichCard.css';

const SandwichCard = ({ name, price }) => {
  return (
    <div className="sandwich-card">
      <h3>{name}</h3>
      <p>{price}</p>
      <button>+</button>
    </div>
  );
};

export default SandwichCard;
