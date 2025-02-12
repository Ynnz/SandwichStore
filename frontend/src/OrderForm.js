import React, { useState, useEffect } from 'react';
import { addOrder, getSandwiches } from './config/api'; 
import CounterInput from './components/CounterInput';
import './OrderForm.css'; // Import the CSS file

function OrderForm() {
  // Used to store the current order in JSON format
  const [sandwichOrdersJSON, setsandwichOrdersJSON] = useState([]);
  // Used to store all the sandwiches fetched from the backend
  const [sandwiches, setSandwiches] = useState([]);
  const [quantities, setQuantities] = useState({});

  // Fetch the sandwiches from the backend only when the page loads
  useEffect(() => {
    const fetchSandwiches = async () => {
      try {
        const fetchedSandwiches = await getSandwiches();
        setSandwiches(fetchedSandwiches);
        // Initialize counter for each sandwich
        const initialQuantities = {};
        fetchedSandwiches.forEach(sandwich => {
          initialQuantities[sandwich._id] = 0;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error('Error fetching sandwiches:', error);
      }
    };

    fetchSandwiches();
  }, []);

  const handleIncrement = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] + 1
    }));
  };

  const handleDecrement = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0
    }));
  };

  // Called when the user clicks the "Place order" button
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Remaps the current order without the name
      const updatedSandwiches = sandwichOrdersJSON.map(item => ({
        quantity: item.quantity,
        id: item.id,
      }));
      // Constructs the order object
      const orderObject = {
        sandwiches: updatedSandwiches,
        status: 'ordered',
      };
      // Send the order to the backend
      const result = await addOrder(orderObject);
      // Clear array for next order
      setsandwichOrdersJSON([]);
      // Reset counter values
      const resetQuantities = {};
      sandwiches.forEach(sandwich => {
        resetQuantities[sandwich._id] = 0;
      });
      setQuantities(resetQuantities);
      alert('Order placed! Order ID: ' + result._id);
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order.');
    }
  };

  // Called when the user clicks the "Add to cart" button in the sandwich list
  const addToCart = (id, quantity, name) => {
    const existingSandwichIndex = sandwichOrdersJSON.findIndex(sandwich => sandwich.id === id);

    if (existingSandwichIndex !== -1) {
      // Update the quantity of the existing sandwich in the cart
      const newSandwichOrdersJSON = sandwichOrdersJSON.map((sandwich, index) => {
        if (index === existingSandwichIndex) {
          return { ...sandwich, quantity: quantity };
        }
        return sandwich;
      });
      setsandwichOrdersJSON(newSandwichOrdersJSON);
    } else {
      // Add a new item if the sandwich is not in the cart
      setsandwichOrdersJSON([...sandwichOrdersJSON, { id, quantity, name }]);
    }
  };

  return (
    <div className="order-form-container">
      <div className="sandwich-list">
        {sandwiches.map((sandwich) => (
          <div key={sandwich._id} className="sandwich-card">
            <h2 className="sandwich-name">{sandwich.name}</h2>
            <p className="sandwich-details">Bread Type: {sandwich.breadType}</p>
            <CounterInput
              value={quantities[sandwich._id]}
              onIncrement={() => handleIncrement(sandwich._id)}
              onDecrement={() => handleDecrement(sandwich._id)}
            />
            <button
              type="button"
              className="add-to-cart-btn"
              onClick={() => {
                if (quantities[sandwich._id] > 0) {
                  addToCart(sandwich._id, quantities[sandwich._id], sandwich.name);
                }
              }}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>

      <div className="shopping-cart">
        <form onSubmit={handleSubmit}>
          <div>
            <h2 className="shopping-cart-title">Shopping Cart</h2>
            <div>
              {sandwichOrdersJSON.map(order => (
                <div key={order.id} className="cart-item">
                  <p className="cart-item-text">
                    {order.name} - Quantity: {order.quantity}
                  </p>
                </div>
              ))}
            </div>
            {sandwichOrdersJSON.length > 0 && (
              <button type="submit" onClick={handleSubmit} className="place-order-btn">
                Place order
              </button>
            )}
          </div>            
        </form>   
      </div>
    </div>
  );
}

export default OrderForm;