import React, {useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CartPage from './components/CartPage';
import OrdersPage from './components/OrdersPage';
import SandwichCard from './components/SandwichCard';
import './App.css';
import { getSandwiches } from './config/api';

const App = () => {
   const [sandwiches, setSandwiches] = useState([]);
   //Fetches the sandwiches when the app starts
   useEffect(() => {
     const fetchSandwiches = async () => {
       const fetchedSandwiches = await getSandwiches();
       setSandwiches(fetchedSandwiches);
     };

     fetchSandwiches();
   }, []);

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>Sandwich Eats</h1>
          </Link>      
          {/*<h1>Sandwich Eats</h1>*/}
          <nav>
            <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }} className="header-button">Cart</Link>
            <Link to="/orders" style={{ textDecoration: 'none', color: 'inherit' }} className="header-button">Orders</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={
            <div className="sandwich-list">
              {sandwiches.map(sandwich => (
                <SandwichCard key={sandwich.name} name={sandwich.name} price={sandwich.price} />
              ))}
            </div>
          } />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
