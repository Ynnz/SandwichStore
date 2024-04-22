import React, { useState, useEffect } from 'react';
import { addOrder, getSandwiches } from './config/api'; 

function OrderForm() {
  //Used to store the current order in JSON format
  const [sandwichOrdersJSON, setsandwichOrdersJSON] = useState([]);
  //Used to store all the sanwiches fetched from the backend
  const [sandwiches, setSandwiches] = useState([]);

  //Fetches the sandwiches from the backend only when the page loads
  useEffect(() => {
    const fetchSandwichesAndInitializeOrder = async () => {
        try {
            const fetchedSandwiches = await getSandwiches();
            setSandwiches(fetchedSandwiches);         
        } catch (error) {
            console.error('Error fetching sandwiches:', error);
        }
    };

    fetchSandwichesAndInitializeOrder();
}, []);

  //Called when the user clicks the "Place order" button
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //TODO: Test thay the implementation works
      //Removes the name from the stored JSON order
      var updatedSandwiches;
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
    setsandwichOrdersJSON([...sandwichOrdersJSON, { id, quantity, name }]);
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
            {/** TODO: The ID should not be visible for the user. But it's still stored somehow in here*/}
            <p>Bread Type: {sandwich.breadType}</p>
            <input type="number"></input>
            <button
              type="submit"
              onClick={() => addToCart(sandwich._id, 2, sandwich.name)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>

      <div>
        <h2>Cart</h2>
        <div>
          {/** Here will be listed the current order details
           * It can be constructed from the sandwichOrdersJSON object
           */}
        </div>
        <button type="submit" onSubmit={handleSubmit}>
          Place order
        </button>
      </div>
    </div>
  );
}

export default OrderForm;