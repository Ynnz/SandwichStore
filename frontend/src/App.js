import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import OrderForm from './OrderForm';
//import OrderStatus from './OrderStatus';
import HistoryOrders from './HistoryOrders';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/order-form" element={<OrderForm />} />
          <Route path="/history-orders" element={<HistoryOrders />} /> 
          <Route path="/" element={<OrderForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;