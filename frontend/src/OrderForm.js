import React, { useState, useEffect } from 'react';
import { addOrder, getSandwiches } from './config/api';  // Adjust path as necessary

function OrderForm() {
  //const [order, setOrder] = useState({ sandwiches: [{ id: '', quantity: 1 }], status: 'ordered' });
  const [order, setOrder] = useState({ sandwiches: [{}], status: 'ordered'});
  const [sandwiches, setSandwiches] = useState([]);

  useEffect(() => {
    const fetchSandwichesAndInitializeOrder = async () => {
        try {
            const fetchedSandwiches = await getSandwiches();
            setSandwiches(fetchedSandwiches);
            
/*            const initialSandwichesOrder = fetchedSandwiches.map(sandwich => ({
                id: sandwich.id,
                quantity: 0 // Initialize all quantities to 1
            }));
            setOrder({...order, sandwiches: initialSandwichesOrder });
*/            
        } catch (error) {
            console.error('Error fetching sandwiches:', error);
        }
    };

    fetchSandwichesAndInitializeOrder();
}, []);



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await addOrder(order);
      alert('Order placed! Order ID: ' + result._id);
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order.');
    }
  };


  return (
    <form onSubmit={handleSubmit}>

      <div>
          {sandwiches.map((sandwich) => (
            <div key={sandwich.id} style={{ margin: '10px', padding: '10px', border: '1px solid gray' }}>
              <h2>{sandwich.name}</h2>
              <h3>ID: {sandwich._id}</h3>
              <p>Bread Type: {sandwich.breadType}</p>
            </div>              
          ))}
      </div>    

      <label>
        Sandwich ID:
        <input type="text" value={order.sandwiches[0].id} min="0" onChange={(e) => setOrder({...order, sandwiches: [{...order.sandwiches[0], id: e.target.value}]})} />
      </label>
      <label>
        Quantity:
        <input type="number" value={order.sandwiches[0].quantity} min="0" onChange={(e) => setOrder({...order, sandwiches: [{...order.sandwiches[0], quantity: Number(e.target.value)}]})} />
      </label>
      
      <button type="submit">Submit</button>
    </form>
  );
}

export default OrderForm;