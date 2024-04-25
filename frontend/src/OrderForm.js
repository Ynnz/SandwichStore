import React, { useState, useEffect } from 'react';
import { addOrder, getSandwiches } from './config/api'; 
import CounterInput from './components/CounterInput';



function OrderForm() {
  //Used to store the current order in JSON format
  const [sandwichOrdersJSON, setsandwichOrdersJSON] = useState([]);
  //Used to store all the sanwiches fetched from the backend
  const [sandwiches, setSandwiches] = useState([]);
  const [quantities, setQuantities] = useState({});

  
  //Fetches the sandwiches from the backend only when the page loads
  useEffect(() => {
    const fetchSandwiches = async () => {
        try {
            const fetchedSandwiches = await getSandwiches();
            setSandwiches(fetchedSandwiches);   
            // Initialize counter
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


  //Called when the user clicks the "Place order" button
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //TODO: Test thay the implementation works
      //Removes the name from the stored JSON order
      var updatedSandwiches = [];
      for (var i = 0; i < sandwichOrdersJSON.length; i++) {
        updatedSandwiches.push({
          quantity: sandwichOrdersJSON[i].quantity,
          id: sandwichOrdersJSON[i].id,
        });
      }
      //TODO: Test that the implementation works
      //Constructs the order object
      var orderObject = {
        sandwiches: updatedSandwiches,
        status: 'ordered',
      };
      //Send the order to the backend. orderObject = body of the request
      const result = await addOrder(orderObject);
      //Clear array for next order
      setsandwichOrdersJSON([]);
      // reset counter
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

  //Called when the user clicks the "Add to cart" button in the sandwich list
  const addToCart = async (id, quantity, name) => {
    //console.log('Adding to cart:', id, quantity, name);
    //TODO: Check if the sandwich is already in the cart
    //TODO: if it is, update the quantity
    //if it is not, add it to the cart with correct quantity
    
    //setsandwichOrdersJSON([...sandwichOrdersJSON, { id, quantity, name }]);
    
    // Check if there's the same sandwich in the cart
    const existingSandwichIndex = sandwichOrdersJSON.findIndex(sandwich => sandwich.id === id);

    // If the sandwich has already exists，update its number
    if (existingSandwichIndex !== -1) {
      // Create a new Order array
      const newSandwichOrdersJSON = sandwichOrdersJSON.map((sandwich, index) => {
        if (index === existingSandwichIndex) {
          // If the sandwich matches，return an updated new object
          return { ...sandwich, quantity: quantity };
        }
        return sandwich;
      });

      // Set new status
      setsandwichOrdersJSON(newSandwichOrdersJSON);
    } else {
      // If sandwich in not in the cart，add a new item
      setsandwichOrdersJSON([...sandwichOrdersJSON, { id, quantity, name }]);
    }
    //alert('Add to cart : ' + name + ' *' + quantity);
  }



  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden'  }}>
      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginRight: '550px',
        padding: '20px' 
      }}>
        {sandwiches.map((sandwich) => (
          <div
            key={sandwich._id}
            style={{
              margin: '10px',
              padding: '20px',
              backgroundColor: '#ffffff', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
              borderRadius: '8px', 
              display: 'flex',
              flexDirection: 'column', 
              alignItems: 'start', 
            }}
          >
            <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>{sandwich.name}</h2>
            <p style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#666' }}>
              Bread Type: {sandwich.breadType}
            </p>
            <CounterInput
              value={quantities[sandwich._id]}
              onIncrement={() => handleIncrement(sandwich._id)}
              onDecrement={() => handleDecrement(sandwich._id)}
            />
            <button
              type="button"
              onClick={() => {
                if (quantities[sandwich._id] > 0) {
                  addToCart(sandwich._id, quantities[sandwich._id], sandwich.name);
                }
              }}
              style={{
                marginTop: '10px',
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none',
                borderRadius: '5px',
                padding: '10px 15px',
                cursor: 'pointer',
                transition: 'background-color 0.3s', 
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'} 
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>

      <div style={{
        width: '400px',
        position: 'fixed',
        right: '50px',
        top: '70px',
        height: '80vh',
        overflowY: 'auto',
        backgroundColor: '#FFB6C1',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
        borderRadius: '10px', 
        padding: '20px' 
      }}>
        <form onSubmit={handleSubmit}>
          <div>
            <h2 style={{
              textAlign: 'center', 
              marginBottom: '20px', 
              color: '#333', 
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' 
            }}> Shopping Cart</h2>
            <div>
              {sandwichOrdersJSON.map(order => (
                <div key={order.id} style={{
                  padding: '10px',
                  borderBottom: '1px solid #ccc',
                  marginBottom: '10px', 
                  borderRadius: '5px', 
                  backgroundColor: 'white', 
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)' 
                }}>
                  <p style={{ fontWeight: 'bold', color: '#333' }}>{order.name} - Quantity: {order.quantity}</p>
                </div>
              ))}
            </div>
            <button type="submit" onClick={handleSubmit} style={{
              width: '100%', 
              padding: '10px 0', 
              backgroundColor: '#FF69B4', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer',
              fontSize: '16px', 
              fontWeight: 'bold' 
            }}>
              Place order
            </button>
          </div>            
        </form>   
      </div>
 
    </div>
  );
}

export default OrderForm;