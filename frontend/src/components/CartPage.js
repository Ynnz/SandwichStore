import React from 'react';
import './CartPage.css';

const CartItem = ({ name, price }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <h3>{name}</h3>
        <div className="quantity-control">
          <button>-</button>
          <span>1</span>
          <button>+</button>
        </div>
        <p className="price">{price}</p>
        <button className="delete-button">delete</button>
      </div>
    </div>
  );
};

const CartPage = () => {
  return (
    <div className="cart-page">
      <h2>Your shopping cart</h2>
      <CartItem name="egg sandwich" price="€2.3" />
      <CartItem name="beef sandwich" price="€2.5" />
      <div className="cart-summary">
        <strong>sum: €4.8</strong>
        <button className="buy-button">BUY</button>
      </div>
    </div>
  );
};

export default CartPage;
