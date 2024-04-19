import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/order-form">Place Order</Link></li>
        <li><Link to="/order-status">Check Order Status</Link></li>
        <li><Link to="/history-orders">History Orders</Link></li> 
      </ul>
    </nav>
  );
}

export default Navbar;