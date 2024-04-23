import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/order-form" activeClassName="active-link">
                        Place Order
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/history-orders" activeClassName="active-link">
                        History Orders
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}


export default Navbar;
