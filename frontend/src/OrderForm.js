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
            // 初始化计数器
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
      alert('Order placed! Order ID: ' + result._id);
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order.');
    }
  };

  //Called when the user clicks the "Add to cart" button in the sandwich list
  const addToCart = async (id, quantity, name) => {
    console.log('Adding to cart:', id, quantity, name);
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
    
  }



  return (
    <div>
      <div>
        {sandwiches.map((sandwich) => (
          <div
            key={sandwich._id}
            style={{
              margin: '10px',
              padding: '10px',
              border: '1px solid gray',
            }}
          >
            <h2>{sandwich.name}</h2>
            <p>Bread Type: {sandwich.breadType}</p>
            <CounterInput
              value={quantities[sandwich._id]}
              onIncrement={() => handleIncrement(sandwich._id)}
              onDecrement={() => handleDecrement(sandwich._id)}
            />         
            <button
              type="button"
              onClick={() => addToCart(sandwich._id, quantities[sandwich._id], sandwich.name)}
            >
              Add to cart
            </button>  
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Cart</h2>
          <div>
            {/** Here will be listed the current order details
             * It can be constructed from the sandwichOrdersJSON object
             */}
          </div>
          <button type="submit" onClick={handleSubmit}>
            Place order
          </button>
        </div>            
      </form>      
    </div>
  );
}

export default OrderForm;